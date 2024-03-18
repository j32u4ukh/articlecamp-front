const navbar = document.querySelector('.nav-bar')

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

// 取得下拉選單區塊
const articleCategory = document.querySelector('.article-category')

// 根據 getCookie 的 category 數據， 動態新增新的選項並設定value屬性
function renderCategory() {
  //取得StringCookie 並轉換型態
  const categoryArrayCookie = getCookie('categoryArrayCookie')
  // console.log(categoryArrayCookie)
  const categoryCookie = JSON.parse(categoryArrayCookie)
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

/* 根據 getCookie articleId 動態渲染 HTML */
//0317 新增 category 參數
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
  articleCategory.value = data.category

  originalArticle.title = data.title
  originalArticle.author = data.author
  originalArticle.content = data.content
  originalArticle.category = data.category
  currentArticle = Object.assign({}, originalArticle)
}

;(function init() {
  homeIcon.addEventListener('click', () => {
    window.location.href = './index.html'
  })

  // 監聽 navbar
  navbar.addEventListener('click', function onNavbarClicked(event) {
    const target = event.target

    if (target.matches('.profile-picture')) {
      const id = Number(target.dataset.id)
      setCookie('articleId', id)
      window.location.href = `./profile.html?id=${id}`
    }
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

  renderCategory()

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
