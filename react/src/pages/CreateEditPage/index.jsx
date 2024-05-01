import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../utils'
import { useSelector } from "react-redux";
import { selectPersist } from "../../store/slice/persist";
import Styles from './styles.module.css'
import axios from 'axios'
import { BASE_URL } from '../../utils'


export default function CreateEditPage(props) {
  const persist = useSelector(selectPersist)
  const token = persist.jwt

  const type = capitalizeFirstLetter(props.type)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const params = useParams()
  const navigate = useNavigate()
  const isEdit = type === 'Edit'

  // 根據 type 進行不同前處理
  switch (type) {
    case 'Edit':
      // TODO: 呼叫 API 取的文章內容
      useEffect(() => {
        // 檢查 id 是否為數字
        if (isNaN(Number(params.id))) {
          // 如果 id 不是數字，使用 history.replace() 重定向到 NotFoundPage
          navigate('/NotFound', { replace: true })
        }
      }, [])
      break
    case 'Create':
      break
    default:
      return navigate('/NotFound', { replace: true })
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/articles/categories`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('Categories:', response.data)
        setCategories(response.data)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
  }, [token])

  function onContentChanged(e) {
    setContent(e.target.value)
  }

  function onTitleChanged(e) {
    setTitle(e.target.value)
  }

  function onCategoryChanged(e) {
    setCategory(e.target.value)
  }

  function onCancelHandler(e) {
    if (isEdit) {
      // 回到上一頁
      navigate(-1);
    } else {
      // 跳轉到文章列表頁
      navigate('/articles');
    }
    setTitle(e.target.value)
  }

  function onSubmitHandler(e) {
    if (isEdit) {
      console.log('edit: submit')
    } else {
      axios
        .post(
          `${BASE_URL}/articles`,
          { title, category, content, },
          { headers: { authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          console.log(response.data)
          navigate('/articles')
        })
        .catch((error) => {
          console.error('Error submitting article:', error)
        })
    }
  }

  return (
    <div className={Styles.content}>
      <h1>{type} Page {isEdit && `#${params.id}`}</h1>
      <label className={Styles.articleTitle}>文章標題:
        <input type="text" value={title} onChange={onTitleChanged} id="article-title" />
      </label>
      <br />
      <label>文章類別: </label>
      <select className={Styles.category} value={category} onChange={onCategoryChanged}>
        <option disabled hidden>編輯分類</option>
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
            value={content} onChange={onContentChanged}>
          </textarea>
        </article>
      </div>
      <div className={Styles.applyBtns}>
        <button className={Styles.updateBtn} onClick={onCancelHandler}>Cancel</button>
        <button className={Styles.cancelBtn} onClick={onSubmitHandler}>Submit</button>
      </div>
    </div>
  )
}
