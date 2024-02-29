// 取得 Logo 物件
const homeIcon = document.querySelector('.icon')

// 使用 getCookie 取得 articleId 將 String 轉型成 Number
const articleId = Number(getCookie('articleId'))

// API 主機
const BASE_URL = 'http://localhost:3000'

// 根據指定的 Id 取得資料
const API_URL = `${BASE_URL}/articles/${articleId}`

// DOM 抓取 class article-content
const articleContent = document.querySelector('.article-content')

/* 根據 getCookie articleId 動態渲染 HTML */
function renderArticle(data) {
  articleContent.innerHTML = `<h1 class="article-title">
      文章標題: <input type="text" value=${data.title} />
    </h1>
    <h3 class="article-author">
      文章作者: <input type="text" value=${data.author} />
    </h3>
    <div class="article-context">
      文章內容:
      <article>
        <textarea cols="50" rows="4" value=${data.content}>${data.content}</textarea>
      </article>
    </div>
    <button class="cancel-btn">Cancel</button>
    <button class="submit-btn">Submit</button>`
}

;(function init() {
  console.log('INIT')

  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  axios
    .get(API_URL)
    .then((response) => {
      const data = response.data
      renderArticle(data)
    })
    .catch((error) => {
      console.log(error)
    })
})()
