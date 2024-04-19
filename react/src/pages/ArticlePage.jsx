import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './articlepage.module.css';
import AlexImage from '../../../src/data/Alex.png';

export default function ArticlePage(){
    const navigate = useNavigate();
    const params = useParams();
    const articleId = params.id;
    
    useEffect(()=>{
        // 檢查 id 是否為數字
        if (isNaN(Number(articleId))) {

            // 如果 id 不是數字，使用 history.replace() 重定向到 NotFoundPage
            navigate('/NotFound', { replace: true });
        }
    }, []);

    return (
        <>
            <button id={styles.editButton}>
                <i className="fa-solid fa-pen-to-square" style={{ fontSize: '30px' }}></i>
            </button>

            <section id={styles.articleContainer}>
                
                <div className={styles.articleContent}>
                    <h1>Article Page # {articleId}</h1>
                    <h1 className={styles.articleTitle}>文章標題:</h1>
                    <h3>文章作者:</h3>
                    <h3>文章分類:</h3>
                    <div className={styles.articleContext}>
                        文章內容:
                        <article></article>
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