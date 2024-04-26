import { useSelector } from "react-redux";
import { selectUser } from "../../store/slice/user";
import { selectPersist } from "../../store/slice/persist";
import { useRef, useState, useEffect } from 'react';
import Styles from './style.module.css'
import axios from 'axios';
import { BASE_URL } from '../../utils'
const INDEX_URL = `${BASE_URL}/articles`

export default function ArticleListPage() {
    // useSelector：拿取 store 的 state，傳入在 slice 建立的 selectUser
    const persist = useSelector(selectPersist)
    const token = persist.jwt

    const states = useSelector(selectUser);
    console.log(`isLogined: ${states.isLogined}, user: ${JSON.stringify(states.user)}`)

    const [articles, setArticles] = useState([]) // 文章列表狀態
    const [size, setSize] = useState(3) // 加載文章數
    const [offset, setOffset] = useState(0) // 位移值
    const [total, setTotal] = useState(0) // 總文章篇數
    const [loading, setLoading] = useState(false) // 加載狀態
    const [allArticlesLoaded, setAllArticlesLoaded] = useState(false) // 總文章加載完畢

    const lastArticleRef = useRef(null) // 最後一篇文章

    useEffect(() => {
        fetchArticles() // 初始文章渲染
    }, [size, offset]) // 監聽 size & offset 變化

    async function fetchArticles() {
        try {
            setLoading(true) // 開始加載文章
            const response = await axios.get(`${INDEX_URL}?size=${size}&offset=${offset}`, {
                headers: { authorization: `Bearer ${token}` }
            })
            const data = response.data
            console.log('data: ', data)
            setArticles((prevArticles) => [...prevArticles, ...data.datas])
            setTotal(data.total) // 更新總文章篇數
        } catch (error) {
            console.error('Error fetching articles:', error)
        } finally {
            setLoading(false) // 加載完成
            console.log('加載完成')
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
        const observer = new IntersectionObserver((entries) => {
            // 當最後一篇文章進入視窗且沒有在加載中且文章數小於總文章數且還有文章未加載時
            if (entries[0].isIntersecting && !loading && articles.length < total) {
                // 增加位移值以加載更多文章
                setOffset((prevOffset) => prevOffset + size);
            }
        }, { threshold: 1 }) // 監聽目標(完全)顯示在螢幕上時觸發
    
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

    return (
        <>
            <div className={Styles.container} 
            // ref={lastArticleRef}
            >
                {articles.map((article, index) => (
                    <div key={index} 
                    // ref={index === articles.length - 1 ? lastArticleRef : null} 
                    className={Styles.article}>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                    </div>
                ))}
                {/* {loading && <p>Loading...</p>} */}
            </div>
            {/* container底下新增div以觸發渲染新文章 */}
            <div ref={lastArticleRef}></div>
        </>
    )
}

// (function init() {
//     axios
//         .get(`${INDEX_URL}?offset=${offset}&size=${size}`, { headers: { authorization: `Bearer ${token}` } })
//         .then((response) => {
//             // 原始:
//             // {total: 3, offset: 0, size: 3, articles: Array(3)}
//             // 更新: (ariticles => datas)
//             // {total: 3, offset: 0, size: 3, datas: Array(3)}
//             // 故將原 datas 改成 data, articles 改成 datas 避免 bad naming
//             const data = response.data
//             console.log(data)
//             console.log(`offset: ${data.offset}`)
//             console.log(`size: ${data.size}`)
//             // 總文章篇數
//             total = data.total
//             // 更新位移值
//             offset = data.size
//             articles.push(...data.datas)
//             console.log(articles)

//             // 頁面載入後渲染特定文章篇數
//             // renderArticles(articles)

//             // 設置 IntersectionObserver
//             // setIntersectionObserver()
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })()


// const articleContainer = document.querySelector('#article-container')
// const createArticle = document.querySelector('#createButton')
// const searchInput = document.querySelector('#search-input')
// const searchButton = document.querySelector('#search-btn')
// const navbar = document.querySelector('.nav-bar')
// const API_URL = `${BASE_URL}/articles`
// const articles = []
// // 從cookie取得token
// const token = COOKIE.get('token')
// // 總文章篇數
// let total = 0
// // 取得文章位移值
// let offset = 0
// // 取得文章篇數
// const size = 10

// // 渲染所有文章
// function renderArticles(articles) {
//     // 無限下滑: 每次只插入新增文章篇數
//     articles.forEach((article) => {
//         renderArticle(article)
//     })
// }

// // 渲染單篇文章
// function renderArticle(article) {
//     const child = document.createElement('li')
//     child.classList.add(
//         'list-group-item',
//         'd-flex',
//         'justify-content-between',
//         'article',
//         'c-border'
//     )
//     let preview = article.content.substring(0, 20)
//     if (article.content.length > 20) {
//         preview += '...'
//     }
//     child.innerHTML = `
//     <div class="article-left">
//       <div class="author">
//         <div class="author-img">
//           <img src="${BASE_URL}/users/images/${article.userId}/${article.image}" />
//         </div>
//         <div class="author-username">${article.name}</div>
//       </div>
//       <div class="title">${article.title}</div>
//       <div class="preview">
//        ${preview}
//       </div>
//     </div>
//     <div class="article-right">
//       <div class="read-favorite">
//           <div class="read" data-id=${article.id}>READ</div>
//           <div class="add-to-favorite">
//               <i class="fa-regular fa-heart add-to-favorite-btn"></i>
//           </div>
//           <div class="edit">
//               <i class="fa-solid fa-pen-to-square edit-btn" data-id=${article.id}></i>
//           </div>
//       </div>
//       <div class="status">
//           <i class="fa-solid fa-comment comment"> 88</i>
//           <i class="fa-solid fa-thumbs-up like"> 49</i>
//           <i class="fa-solid fa-thumbs-down dislike"> 3</i>
//           <i class="fa-solid fa-heart favorite"> 7</i>
//       </div>
//     </div>`
//     articleContainer.appendChild(child)
// }

// // 取得文章分類數據後，存入 Cookie
// function setCategoryCookie() {
//   const category = COOKIE.get('category')
//   // 若 Cookie 中沒有文章分類數據，才向後端送出請求
//   if (category === undefined) {
//     axios
//       .get(`${API_URL}/categories`, {
//         headers: { authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         COOKIE.set('category', response.data)
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   }
// }

// // 設置 IntersectionObserver
// function setIntersectionObserver() {
//   const observer = new IntersectionObserver(
//     (entries) => {
//       if (entries[0].isIntersecting) {
//         // 關閉觀察
//         observer.unobserve(articleContainer.lastChild)

//         // 發送請求
//         axios
//           // header新增
//           .get(`${API_URL}?offset=${offset}&size=${size}`, {
//             headers: { authorization: `Bearer ${token}` },
//           })
//           .then((response) => {
//             const DATA = response.data

//             // 更新總文章篇數
//             total = DATA.total

//             // 取得下一批文章數據
//             const articles = DATA.datas

//             // 渲染新文章
//             renderArticles(articles)

//             // 更新位移值
//             offset += articles.length

//             console.log(
//               `total: ${total}, offset: ${offset}, #articles: ${articles.length}`
//             )

//             if (total > offset) {
//               // 啟動觀察
//               observer.observe(articleContainer.lastChild)
//             } else {
//               console.log('已全部渲染完成')

//               // 關閉觀察
//               observer.unobserve(articleContainer.lastChild)
//             }
//           })
//           .catch((error) => {
//             console.error(error)
//           })
//       }
//     },
//     { threshold: 1 } // 預設為 0, 0 是觀察對象上方, 1 是下方
//   )

//   // 啟動觀察
//   observer.observe(articleContainer.lastChild)
// }

// // 初始化
// ;(function init() {
//   // 取得文章分類列表並記入 Cookie
//   setCategoryCookie()

//   const user = COOKIE.get('user')
//   COOKIE.set('userId', user.id)

//   renderHeader()

//   // 重置搜尋框
//   searchInput.value = ''

//   // 監聽 articleContainer
//   articleContainer.addEventListener('click', function onArticleClicked(event) {
//     const target = event.target

//     if (target.matches('.read')) {
//       const id = Number(target.dataset.id)
//       COOKIE.set('articleId', id)
//       window.location.href = `./article.html`
//     } else if (target.matches('.edit-btn')) {
//       const id = Number(target.dataset.id)
//       COOKIE.set('articleId', id)
//       window.location.href = './edit.html'
//     }
//   })

//   // 新增文章按鈕
//   createArticle.addEventListener('click', function onCreateClicked(event) {
//     window.location.href = './create.html'
//   })

//   // 根據關鍵字查詢文章
//   searchButton.addEventListener('click', (event) => {
//     const input = searchInput.value.trim()
//     let url = API_URL
//     if (input !== '') {
//       url += `?keyword=${input}`
//     }
//     axios
//       // header 新增 token
//       .get(url, { headers: { authorization: `Bearer ${token}` } })
//       .then((response) => {
//         console.log(response)
//         let data = response.data
//         articles.splice(0, articles.length)
//         articles.push(...data.datas)
//         renderArticles(articles)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   })

//   axios
//     // header新增token
//     .get(API_URL, { headers: { authorization: `Bearer ${token}` } })
//     .then((response) => {
//       // 原始:
//       // {total: 3, offset: 0, size: 3, articles: Array(3)}
//       // 更新: (ariticles => datas)
//       // {total: 3, offset: 0, size: 3, datas: Array(3)}
//       // 故將原 datas 改成 data, articles 改成 datas 避免 bad naming
//       let data = response.data
//       console.log(data)
//       console.log(`offset: ${data.offset}`)
//       console.log(`size: ${data.size}`)
//       // 總文章篇數
//       total = data.total
//       // 更新位移值
//       offset = data.size
//       articles.push(...data.datas)

//       // 頁面載入後渲染特定文章篇數
//       renderArticles(articles)

//       // 設置 IntersectionObserver
//       setIntersectionObserver()
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// })()

