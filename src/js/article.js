const articleId = Number(getCookie('articleId'))
const BASE_URL = 'http://localhost:3000'
const API_URL = `${BASE_URL}/articles/${articleId}`
const articleContent = document.querySelector('.article-content')
const homeIcon = document.querySelector('.icon')

function renderArticle(data) {
  articleContent.innerHTML = `<h1 class="article-title">文章標題: ${data.title}</h1>
    <h3 class="article-author">文章作者: ${data.author}</h3>
    <div class="article-context">
      文章內容:
      <article>
        ${data.content}
      </article>
    </div>`
}

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
