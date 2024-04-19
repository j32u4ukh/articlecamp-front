import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './editpage.module.css';

export default function EditPage(){
    const navigate = useNavigate();
    const params= useParams();
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
            <div className={styles.articleContent}>
                <h1>Edit Page # {articleId}</h1>
                <label className={styles.articleTitle}>文章標題: 
                    <input type="text" value="" id="article-title" />
                </label>
                <br />
                <label>文章類別: </label>
                <select className={styles.articleCategory}>
                    <option selected>請選擇文章類別</option>
                    <option>類別1</option>
                    <option>類別2</option>
                    <option>類別3</option>
                    <option>類別4</option>
                    <option>類別5</option>
                    <option>類別6</option>
                    <option>類別7</option>
                </select>
                <div className={styles.articleContext}>
                    文章內容:
                    <article>
                    <textarea
                        id="article-context"
                        cols="50"
                        rows="4">
                        預設的文章內容
                    </textarea>
                    </article>
                </div>
                 <button className={styles.updateBtn}>Cancel</button>
                 <button className={styles.cancelBtn}>Submit</button>
            </div>
        </>
    );
}