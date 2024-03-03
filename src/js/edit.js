// 取得 Logo 物件
const homeIcon = document.querySelector('.icon')

// DOM 抓取 class article-content
const submitBtn = document.querySelector('.submit-btn')

// cancel-btn，回到article.html
const cancelArticle = document.querySelector('.cancel-btn')

const panel = document.querySelector('.article-content')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const context = document.querySelector('#context')

// 使用 getCookie 取得 articleId 將 String 轉型成 Number
const articleId = Number(getCookie('articleId'))

// 根據指定的 Id 取得資料
const API_URL = `${BASE_URL}/articles/${articleId}`

const originalArticle = {}
let currentArticle = {}

/* 根據 getCookie articleId 動態渲染 HTML */
function renderArticle(data) {
  panel.addEventListener('change', function onDataChanged(e) {
    const target = e.target
    const key = target.dataset.key
    if (key) {
      currentArticle[key] = target.value
    }
  })

  title.value = data.title
  author.value = data.author
  context.value = data.content
  originalArticle.title = data.title
  originalArticle.author = data.author
  originalArticle.content = data.content
  currentArticle = Object.assign({}, originalArticle)
}

;(function init() {
  homeIcon.addEventListener('click', () => {
    window.location.href = './index.html'
  })

  submitBtn.addEventListener('click', () => {
    const origial = Object.values(originalArticle)
    const current = Object.values(currentArticle)
    const isUpdated = origial.some((value, index) => {
      return value !== current[index]
    })
    if (isUpdated) {
      console.log('Content updated, ready to submit.')
      axios
        .put(API_URL, currentArticle)
        .then(() => {
          // console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          window.location.href = './index.html'
        })
    } else {
      console.log("Didn't update any content.")
    }
  })

  // cancel-btn，回到 index.html
  cancelArticle.addEventListener('click', function () {
    // console.log(event)
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
