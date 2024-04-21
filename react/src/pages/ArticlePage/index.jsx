import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './styles.module.css';
import AlexImage from '../../../../src/data/Alex.png';

export default function ArticlePage(){
    const navigate = useNavigate();
    const params = useParams();
    const articleId = params.id;
    
    const articleContent = {
        title : `文章1`,
        author : `文章1作者`,
        category : `類別1`,
        content : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    }

    useEffect(()=>{
        // 檢查 id 是否為數字
        if (isNaN(Number(articleId))) {

            // 如果 id 不是數字，使用 history.replace() 重定向到 NotFoundPage
            navigate('/NotFound', { replace: true });
        }
    }, []);

    function editRedirect () {
        navigate(`/articles/${articleId}/edit`)
    }

    return (
        <>
            <section id={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.articleTitle}>{articleContent.title}</h1>
                        <button id={styles.editBtn} onClick={editRedirect}>
                            <i className="fa-solid fa-pen-to-square" style={{ fontSize: '30px' }}></i>
                        </button>
                    <h3>{articleContent.author}</h3>
                    <h3>{articleContent.category}</h3>
                    <div className={styles.context}>
                        <article>{articleContent.content}</article>
                    </div>
                </div>
            </section>

            {/* 留言區 */}
            <div id={styles.commentsContainer}>
                <div id={styles.commenter}>
                    <div className={styles.commenterImg}>
                        <img src={AlexImage} />
                    </div>
                    <div className={styles.commenterName}></div>
                </div>

                <form id={styles.commentForm}>
                    <textarea id={styles.comment} placeholder="請留下您的評論" required>
                    </textarea>
                </form>
                <div className={styles.commentControls}>
                    <button>留言</button>
                    <button>取消</button>
                </div>
            </div>
            {/* 歷史留言區 (還要放留言者頭像及名字) */}
            <div className={styles.commentList}></div>
        </>
    );
}