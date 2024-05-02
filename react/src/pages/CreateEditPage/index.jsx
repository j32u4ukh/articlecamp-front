import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectPersist } from "../../store/slice/persist";
import { BASE_URL, capitalizeFirstLetter } from "../../utils";
import PageStyles from "../page.module.css";
import Styles from "./styles.module.css";

export default function CreateEditPage(props) {
    const persist = useSelector(selectPersist);
    const token = persist.jwt;

    const type = capitalizeFirstLetter(props.type);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const isEdit = type === "Edit";

    // 根據 type 進行不同前處理
    switch (type) {
        case "Edit":
            // TODO: 呼叫 API 取的文章內容
            useEffect(() => {
                // 檢查 id 是否為數字
                if (isNaN(Number(params.id))) {
                    // 如果 id 不是數字，使用 history.replace() 重定向到 NotFoundPage
                    navigate("/NotFound", { replace: true });
                }
            }, []);
            break;
        case "Create":
            break;
        default:
            return navigate("/NotFound", { replace: true });
    }

    // TODO: catch 到 JWT 過期的錯誤訊息後，返回登入頁
    // TODO: 分類數據存入持久性數據，不要重複存取
    // useEffect(() => {
    //     axios
    //         .get(`${BASE_URL}/articles/categories`, {
    //             headers: { authorization: `Bearer ${token}` },
    //         })
    //         .then((response) => {
    //             console.log("Categories:", response.data);
    //             setCategories(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching categories:", error);
    //         });
    // }, []);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/articles/${params.id}`, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(`The article: ${JSON.stringify(response.data)}`);
                const { title, content, category } = response.data;
                setTitle(title);
                setContent(content);
                setCategory(category);
            })
            .catch((error) => {
                console.error(
                    `Error fetching article: ${JSON.stringnify(error)}`,
                );
            });
    }, []);

    function onContentChanged(e) {
        setContent(e.target.value);
    }

    function onTitleChanged(e) {
        setTitle(e.target.value);
    }

    function onCategoryChanged(e) {
        setCategory(e.target.value);
    }

    function onCancelHandler(e) {
        if (isEdit) {
            // 回到上一頁
            navigate(-1);
        } else {
            // 跳轉到文章列表頁
            navigate("/articles");
        }
        // setTitle(e.target.value);
    }

    function onSubmitHandler(e) {
        if (isEdit) {
            axios
                .put(
                    `${BASE_URL}/articles/${params.id}`,
                    { title, category, content },
                    { headers: { authorization: `Bearer ${token}` } },
                )
                .then((response) => {
                    console.log(response.data);
                    navigate("/articles");
                })
                .catch((error) => {
                    console.error(
                        `Error updating article: ${JSON.stringify(error)}`,
                    );
                });
        } else {
            axios
                .post(
                    `${BASE_URL}/articles`,
                    { title, category, content },
                    { headers: { authorization: `Bearer ${token}` } },
                )
                .then((response) => {
                    console.log(response.data);
                    navigate("/articles");
                })
                .catch((error) => {
                    console.error("Error submitting article:", error);
                });
        }
    }

    return (
        <div className={PageStyles.container}>
            <h1>
                {type} Page {isEdit && `#${params.id}`}
            </h1>
            <label className={Styles.articleTitle}>文章標題:&nbsp;</label>
            <input
                type="text"
                value={title}
                onChange={onTitleChanged}
                id="article-title"
            />
            <br />
            <label>文章類別: </label>
            <select
                className={Styles.category}
                value={category}
                onChange={onCategoryChanged}
            >
                <option disabled hidden>
                    編輯分類
                </option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <div className={Styles.context}>
                文章內容:
                <article>
                    <textarea
                        id="article-context"
                        cols="50"
                        rows="4"
                        value={content}
                        onChange={onContentChanged}
                    ></textarea>
                </article>
            </div>
            <div className={Styles.applyBtns}>
                <button className={Styles.updateBtn} onClick={onCancelHandler}>
                    Cancel
                </button>
                <button className={Styles.cancelBtn} onClick={onSubmitHandler}>
                    Submit
                </button>
            </div>
        </div>
    );
}
