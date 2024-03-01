const articleId = Number(getCookie('articleId'))
const BASE_URL = 'http://localhost:3000'
const API_URL = `${BASE_URL}/articles/${articleId}`
const articleContent = document.querySelector('.article-content')
const homeIcon = document.querySelector('.icon')
const editArticle = document.querySelector('#editButton')
const title = document.querySelector('.article-title')
const author = document.querySelector('.article-author')
const context = document.querySelector('.article-context')

function renderArticle(data) {
  title.innerHTML = `文章標題: ${data.title}`
  author.innerHTML = `文章作者: ${data.author}`
  context.innerHTML = data.content
}

;(function init() {
  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  // 編輯文章按鈕
  editArticle.addEventListener('click', function (event) {
    // const id = Number(event.target.dataset.id)
    // setCookie('articleId', id)
    window.location.href = './edit.html'
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
