import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../utils'
import styles from './styles.module.css'

export default function CreateEditPage(props) {
  const type = capitalizeFirstLetter(props.type)
  const isEdit = type === 'Edit'
  const [title, setTitle] = useState(isEdit ? '編輯標題' : '')
  const [content, setContent] = useState(isEdit ? '編輯' : '')
  const params = useParams()
  const navigate = useNavigate()
  
  function onChangeHandler(e) {
    setContent(e.target.value)
  }

  function onTitleHandler(e) {
    setTitle(e.target.value)
  }

  if (isEdit) {
    useEffect(() => {
      // 檢查 id 是否為數字
      if (isNaN(Number(params.id))) {
        // 如果 id 不是數字，使用 history.replace() 重定向到 NotFoundPage
        navigate('/NotFound', { replace: true })
      }
    }, [])
  }
  
  return (
    <>
            <div className={styles.content}>
                <h1>{type} Page {isEdit && `#${params.id}`}</h1>
                <label className={styles.articleTitle}>文章標題: 
                    <input type="text" value={title} onChange={onTitleHandler} id="article-title" />
                </label>
                <br />
                <label>文章類別: </label>
                <select className={styles.category}>
                    <option value={content} selected>{isEdit ? `編輯的分類` : `預設的文章類別`}</option>
                    <option>類別1</option>
                    <option>類別2</option>
                    <option>類別3</option>
                    <option>類別4</option>
                    <option>類別5</option>
                    <option>類別6</option>
                    <option>類別7</option>
                </select>
                <div className={styles.context}>
                    文章內容:
                    <article>
                    <textarea
                        id="article-context"
                        cols="50"
                        rows="4"
                        value={content} onChange={onChangeHandler}>
                    </textarea>
                    </article>
                </div>
                 <button className={styles.updateBtn}>Cancel</button>
                 <button className={styles.cancelBtn}>Submit</button>
            </div>
        </>
  )
}
