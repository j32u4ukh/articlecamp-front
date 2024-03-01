// 取得 Logo 物件
const homeIcon = document.querySelector('.icon')

// 使用 getCookie 取得 articleId 將 String 轉型成 Number
const articleId = Number(getCookie('articleId'))

// API 主機
const BASE_URL = 'http://localhost:3000'

// 根據指定的 Id 取得資料
const API_URL = `${BASE_URL}/articles/${articleId}`

// DOM 抓取 class article-content
const articleInput = document.querySelectorAll('.article-content input')
const submitBtn = document.querySelector('.submit-btn')

// cancel-btn，回到article.html
const cancelArticle = document.querySelector('.cancel-btn')

const panel = document.querySelector('.article-content')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const context = document.querySelector('#context')

const originalArticle = {}
let currentArticle = {}

/* 根據 getCookie articleId 動態渲染 HTML */
function renderArticle(data) {
  panel.addEventListener('change', function onDataChanged(e) {
    const target = e.target
    const key = target.dataset.key
    if (key) {
      currentArticle[key] = target.value
      console.log(`New currentArticle: ${JSON.stringify(currentArticle)}`)
    }
  })

  console.log(`data: ${JSON.stringify(data)}`)
  title.value = data.title
  author.value = data.author
  context.value = data.content
  originalArticle.title = data.title
  originalArticle.author = data.author
  originalArticle.content = data.content
  currentArticle = Object.assign({}, originalArticle)
  console.log(`originalArticle: ${JSON.stringify(originalArticle)}`)
  console.log(`currentArticle: ${JSON.stringify(currentArticle)}`)
}

;(function init() {
  console.log('INIT')

  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  submitBtn.addEventListener('click', (e) => {
    const origial = Object.values(originalArticle)
    const current = Object.values(currentArticle)
    console.log(`originalArticle: ${JSON.stringify(originalArticle)}`)
    console.log(`currentArticle: ${JSON.stringify(currentArticle)}`)
    const isUpdated = origial.some((value, index) => {
      return value !== current[index]
    })
    if (isUpdated) {
      console.log('Content updated, ready to submit.')
      console.log(
        `API_URL: ${API_URL}, currentArticle: ${JSON.stringify(currentArticle)}`
      )
      axios
        .put(API_URL, currentArticle)
        .then(() => {
          // console.log(response)
          window.location.href = './index.html'
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      console.log("Didn't update any content.")
    }
  })

  // cancel-btn，回到 index.html
  cancelArticle.addEventListener('click', function (event) {
    // console.log(event)
    window.location.href = './index.html'
  })

  console.log(`API_URL: ${API_URL}`)

  axios
    .get(API_URL)
    .then((response) => {
      const data = response.data
      console.log('Get data: ' + data)
      renderArticle(data)
    })
    .catch((error) => {
      console.log(error)
    })
})()
