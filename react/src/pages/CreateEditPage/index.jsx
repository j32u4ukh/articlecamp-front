import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../utils'
import Styles from './styles.module.css'

export default function CreateEditPage(props) {
  const type = capitalizeFirstLetter(props.type)
  const isEdit = type === 'Edit'
  const [title, setTitle] = useState(isEdit ? '編輯標題' : '')
  const [content, setContent] = useState(isEdit ? '編輯' : '')
  const params = useParams()
  const navigate = useNavigate()
  
  function onContentChanged(e) {
    setContent(e.target.value)
  }

  function onTitleChanged(e) {
    setTitle(e.target.value)
  }

  // TODO: 確認 if (isEdit) 在 useEffect 外面和在 useEffect 裡面有何差別
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
    <div className={Styles.content}>
        <h1>{type} Page {isEdit && `#${params.id}`}</h1>
        <label className={Styles.articleTitle}>文章標題: 
            <input type="text" value={title} onChange={onTitleChanged} id="article-title" />
        </label>
        <br />
        <label>文章類別: </label>
        <select className={Styles.category}>
            {/* <option value={content} selected>{isEdit ? `編輯的分類` : `預設的文章類別`}</option> */}
            <option value="0" selected>無分類</option>
            <option>類別1</option>
            <option>類別2</option>
            <option>類別3</option>
            <option>類別4</option>
            <option>類別5</option>
            <option>類別6</option>
            <option>類別7</option>
        </select>
        <div className={Styles.context}>
            文章內容:
            <article>
            <textarea
                id="article-context"
                cols="50"
                rows="4"
                value={content} onChange={onContentChanged}>
            </textarea>
            </article>
        </div>
        <div className={Styles.applyBtns}>          
          <button className={Styles.updateBtn}>Cancel</button>
          <button className={Styles.cancelBtn}>Submit</button>
        </div>
    </div>
  )
}
