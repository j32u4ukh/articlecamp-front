import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlexImage from "../../../../src/data/Alex.png";
import PageStyles from "../page.module.css";
import Styles from "./styles.module.css";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { useSelector } from "react-redux";
import { selectPersist } from "../../store/slice/persist";

export default function ArticlePage() {
    const navigate = useNavigate();
    const params = useParams();
    const articleId = params.id;
    const messageBoxRef = useRef("");
    const [article, setArticle] = useState({});
    const persist = useSelector(selectPersist);
    const jwt = persist.jwt;
    const categories = persist.categories;
    let onClick = false;

    useEffect(() => {
        // 檢查 id 是否為數字
        if (isNaN(Number(articleId))) {
            // 如果 id 不是數字，使用 history.replace() 重定向到 NotFoundPage
            navigate("/NotFound", { replace: true });
        }
        axios
            .get(`${BASE_URL}/articles/${articleId}`, {
                headers: { authorization: `Bearer ${jwt}` },
            })
            .then((response) => {
                const data = response.data;
                console.log(`data: ${JSON.stringify(data)}`);
                // data: {"id":1,"userId":1,"name":"Henry","image":"8Cma4wzXfNbRHg22xk2g8NU3V9aOKEr.png","title":"Article-0","category":1,"content":"This is content 0 hh","updatedAt":"2024-05-02T14:12:04.000Z"}
                setArticle(data);
            });
    }, []);

    function editRedirect() {
        navigate(`/articles/${articleId}/edit`);
    }

    // TODO: 修正成 -> 點到留言區以外的地方，留言框縮小
    function onTextAreaHandler() {
        if (onClick) {
            messageBoxRef.current.style.height = "100px";
            onClick = false;
        } else {
            messageBoxRef.current.style.height = "120px";
            onClick = true;
        }
    }

    function onCancelHandler(e) {
        // 清空留言框的內容
        messageBoxRef.current.value = "";

        // 恢復留言框的高度為原始值
        messageBoxRef.current.style.height = ""; // 或者直接設置為空字符串

        // 將 onClick 設置為 false，以確保下次點擊留言框時不會觸發放大效果
        onClick = false;
    }

    return (
        <section className={PageStyles.container}>
            <div className={Styles.content}>
                <h2 className={`${Styles.articleTitle} ${Styles.metadata}`}>
                    {article.title}
                </h2>
                <h4 className={`${Styles.metadata}`}>{article.name}</h4>
                <h4 className={`${Styles.metadata}`}>
                    {categories[article.category]}
                </h4>
                <article>{article.content}</article>
                <div className={PageStyles.applyBtns}>
                    <button onClick={editRedirect}>
                        {/* TODO: 換掉編輯按鈕圖示 */}
                        <i
                            className="fa-solid fa-pen-to-square"
                            style={{ fontSize: "30px" }}
                        ></i>
                    </button>
                </div>
            </div>

            {/* 留言區 */}
            <div id={Styles.commentsContainer}>
                <div id={Styles.commenter}>
                    <div className={Styles.commenterImg}>
                        <img src={AlexImage} />
                    </div>
                    <div className={Styles.commenterName}></div>
                </div>
                {/* TODO: 設定固定高度 Height */}
                <textarea
                    id={Styles.comment}
                    ref={messageBoxRef}
                    onClick={onTextAreaHandler}
                    placeholder="請留下您的評論"
                    required
                ></textarea>
                <div className={PageStyles.applyBtns}>
                    <button onClick={onCancelHandler}>取消</button>
                    <button>留言</button>
                </div>
            </div>
            {/* 歷史留言區 (還要放留言者頭像及名字) */}
            <div className={Styles.commentList}></div>
        </section>
    );
}
