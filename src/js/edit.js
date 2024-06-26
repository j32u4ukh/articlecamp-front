// DOM 抓取 class article-content
const submitBtn = document.querySelector('.submit-btn')

// cancel-btn，回到 article.html
const cancelBtn = document.querySelector('.cancel-btn')

const panel = document.querySelector('.article-content')
const title = document.querySelector('#title')
const context = document.querySelector('#context')

// 取得下拉選單區塊
const articleCategory = document.querySelector('.article-category')

// 使用 getCookie 取得 articleId 將 String 轉型成 Number
const articleId = Number(COOKIE.get('articleId'))

// 根據指定的 articleId 取得資料
const API_URL = `${BASE_URL}/articles/${articleId}`

const originalArticle = {}
let currentArticle = {}

// 從 cookie 取得 token
const token = COOKIE.get('token')

// 根據 getCookie 的 category 數據， 動態新增新的選項並設定value屬性
function renderCategory() {
  const categoryCookie = COOKIE.get('category')
  // console.log(categoryCookie)

  // 根據 CookieArray 長度 設定要建立幾個 option 並給予值 跟文字顯示 name
  const nCetegory = categoryCookie.length
  for (let count = 0; count < nCetegory; count++) {
    const category = categoryCookie[count]
    const newOption = document.createElement('option')
    newOption.textContent = category.name
    newOption.setAttribute('value', category.id)
    // 將新創建的 option 元素添加到 articleCategory 中
    articleCategory.appendChild(newOption)
    // console.log(newOption.value)
  }
}

/* 根據 articleId 動態渲染 HTML */
function renderArticle(data) {
  panel.addEventListener('change', function onDataChanged(e) {
    const target = e.target
    const key = target.dataset.key
    if (key) {
      currentArticle[key] = target.value
    }
  })

  title.value = data.title
  context.value = data.content
  articleCategory.value = data.category

  originalArticle.title = data.title
  originalArticle.content = data.content
  originalArticle.category = data.category
  currentArticle = Object.assign({}, originalArticle)
}

;(function init() {
  submitBtn.addEventListener('click', () => {
    const origial = Object.values(originalArticle)
    const current = Object.values(currentArticle)
    const isUpdated = origial.some((value, index) => {
      return value !== current[index]
    })
    if (isUpdated) {
      console.log('Content updated, ready to submit.')
      axios
        .put(API_URL, currentArticle, {
          headers: { authorization: `Bearer ${token}` },
        })
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
  cancelBtn.addEventListener('click', function () {
    // console.log(event)
    window.location.href = './index.html'
  })

  renderHeader()
  renderCategory()

  axios
    .get(API_URL, { headers: { authorization: `Bearer ${token}` } })
    .then((response) => {
      const data = response.data
      renderArticle(data)
    })
    .catch((error) => {
      console.log(error)
    })
})()
