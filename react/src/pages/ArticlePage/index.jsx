import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlexImage from "../../../../src/data/Alex.png";
import PageStyles from "../page.module.css";
import Styles from "./styles.module.css";

export default function ArticlePage() {
    const messageBoxRef = useRef("");
    const navigate = useNavigate();
    const params = useParams();
    const articleId = params.id;
    let onClick = false;

    const article = {
        title: `文章${articleId}`,
        author: `文章${articleId}作者`,
        category: `類別${articleId}`,
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    };

    useEffect(() => {
        // 檢查 id 是否為數字
        if (isNaN(Number(articleId))) {
            // 如果 id 不是數字，使用 history.replace() 重定向到 NotFoundPage
            navigate("/NotFound", { replace: true });
        }
    }, []);

    function editRedirect() {
        navigate(`/articles/${articleId}/edit`);
    }

    function onTextAreaHandler() {
        if (onClick) {
            messageBoxRef.current.style.height = "";
            onClick = false;
        } else {
            messageBoxRef.current.style.height = "100px";
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
        <>
            {/* TODO container 與 留言區 用 div 再包覆*/}
            <section className={PageStyles.container}>
                <div className={Styles.content}>
                    {/* TODO 置中 */}
                    <h1 className={Styles.articleTitle}>{article.title}</h1>
                    {/* TODO 置中 */}
                    <h3>{article.author}</h3>
                    {/* TODO 置中 */}
                    <h3>{article.category}</h3>
                    <div
                        className={`${PageStyles["d-flex"]} ${PageStyles["c-flex-axis1-end"]} ${PageStyles["c-flex-axis2-column"]}`}
                    >
                        <article>{article.content}</article>
                        <button id={Styles.editBtn} onClick={editRedirect}>
                            <i
                                className="fa-solid fa-pen-to-square"
                                style={{ fontSize: "30px" }}
                            ></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* 留言區 */}
            <div id={Styles.commentsContainer}>
                <div id={Styles.commenter}>
                    <div className={Styles.commenterImg}>
                        <img src={AlexImage} />
                    </div>
                    <div className={Styles.commenterName}></div>
                </div>
                {/* TODO設定固定高度 Height */}
                <form id={Styles.commentForm} onClick={onTextAreaHandler}>
                    <textarea
                        id={Styles.comment}
                        ref={messageBoxRef}
                        placeholder="請留下您的評論"
                        required
                    ></textarea>
                </form>
                <div className={Styles.commentControls}>
                    <button onClick={onCancelHandler}>取消</button>
                    <button>留言</button>
                </div>
            </div>
            {/* 歷史留言區 (還要放留言者頭像及名字) */}
            <div className={Styles.commentList}></div>
        </>
    );
}
