import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/slice/user";
import { selectPersist, setCategories } from "../../store";
import { useRef, useState, useEffect } from "react";
import Styles from "./style.module.css";
import axios from "axios";
import { BASE_URL } from "../../utils";
const INDEX_URL = `${BASE_URL}/articles`;

export default function ArticleListPage() {
    // useSelector：拿取 store 的 state，傳入在 slice 建立的 selectUser
    const persist = useSelector(selectPersist);
    const token = persist.jwt;

    const dispatch = useDispatch();
    const states = useSelector(selectUser);
    console.log(
        `isLogined: ${states.isLogined}, user: ${JSON.stringify(states.user)}`,
    );
    // 文章列表狀態
    const [articles, setArticles] = useState([]);
    // 加載文章數
    const [size, setSize] = useState(3);
    // 位移值
    const [offset, setOffset] = useState(0);
    // 總文章篇數
    const [total, setTotal] = useState(0);
    // 加載狀態
    const [loading, setLoading] = useState(false);
    // 總文章加載完畢
    const [allArticlesLoaded, setAllArticlesLoaded] = useState(false);
    // 最後一篇文章
    const lastArticleRef = useRef(null);

    useEffect(() => {
        fetchArticles(); // 初始文章渲染
    }, [size, offset]); // 監聽 size & offset 變化

    async function fetchArticles() {
        try {
            // 開始加載文章
            setLoading(true);
            const response = await axios.get(
                `${INDEX_URL}?size=${size}&offset=${offset}`,
                {
                    headers: { authorization: `Bearer ${token}` },
                },
            );
            const data = response.data;
            console.log("data: ", data);
            setArticles((prevArticles) => [...prevArticles, ...data.datas]);

            // 更新總文章篇數
            setTotal(data.total);

            const categoryRes = await axios.get(
                `${BASE_URL}/articles/categories`,
                {
                    headers: { authorization: `Bearer ${token}` },
                },
            );
            const category = {};
            categoryRes.data.forEach((c) => {
                category[c.id] = c.name;
            });
            console.log(`category: ${JSON.stringify(category)}`);
            dispatch(setCategories(category));
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            // 加載完成
            setLoading(false);
            console.log("加載完成");
        }
    }

    useEffect(() => {
        // 檢查是否所有文章都已加載
        if (articles.length >= total) {
            setAllArticlesLoaded(true);
            setLoading(false); // 當所有文章都已加載時更新加載狀態
        }
    }, [articles, total]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // 當最後一篇文章進入視窗且沒有在加載中且文章數小於總文章數且還有文章未加載時
                if (
                    entries[0].isIntersecting &&
                    !loading &&
                    articles.length < total
                ) {
                    // 增加位移值以加載更多文章
                    setOffset((prevOffset) => prevOffset + size);
                }
            },
            { threshold: 1 },
        ); // 監聽目標(完全)顯示在螢幕上時觸發

        // 如果最後一篇文章存在，開始觀察最後一篇文章
        if (lastArticleRef.current) {
            observer.observe(lastArticleRef.current);
        }

        // 卸載時停止監聽最後一篇文章
        return () => {
            if (lastArticleRef.current) {
                observer.unobserve(lastArticleRef.current);
            }
        };
    }, [articles, total, size, loading]);

    // TODO: 清單列表中的項目改為組件形式
    // TODO: 清單列表中的項目缺少前往單篇文章頁面的機制
    return (
        <>
            <div className={Styles.container}>
                {articles.map((article, index) => (
                    <div key={index} className={Styles.article}>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                    </div>
                ))}
            </div>
            {/* container底下新增div以觸發渲染新文章 */}
            <div ref={lastArticleRef}></div>
        </>
    );
}
