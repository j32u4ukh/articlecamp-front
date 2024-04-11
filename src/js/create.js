const submitButton = document.querySelector('.submit-btn')
const articleTitle = document.querySelector('#article-title')
const articleContext = document.querySelector('#article-context')
const cancelButton = document.querySelector('.cancel-btn')
const homeIcon = document.querySelector('.icon')
const navbar = document.querySelector('.nav-bar')
// 取得下拉選單區塊
const articleCategory = document.querySelector('.article-category')

const API_URL = `${BASE_URL}/articles`

// 從cookie取得token
const token = COOKIE.get('token')

// 根據 getCookie 的 category 數據， 動態新增新的選項並設定 value 屬性
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
    // console.log(`value: ${newOption.value}, name: ${newOption.textContent}`)
  }
}

// 新增文章後，送出 API 請求
function createArticleAPI(title, content, category) {
  axios
    .post(
      API_URL,
      {
        title,
        content,
        category,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    )
    .then((res) => {
      // console.log(`res: ${JSON.stringify(res.data)}`)
      window.location.href = './index.html'
    })
    .catch((error) => {
      console.log(error)
    })
}

;(function init() {
  // 新增文章按鈕，按下後，確認欄位填寫，新增文章
  submitButton.addEventListener('click', function createArticleClicked(event) {
    const title = articleTitle.value.trim()
    const content = articleContext.value.trim()
    const category = articleCategory.value
    // console.log(`category: ${category}`)
    if (title.length === 0 || content.length === 0) {
      alert('文章標題、文章內容皆不得空白!')
    } else {
      createArticleAPI(title, content, category)
    }
  })

  // 取消新增文章，按下按鈕返回首頁
  cancelButton.addEventListener('click', function cancelButtonClicked(event) {
    console.log(event)
    window.location.href = './index.html'
  })

  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  renderCategory()
})()
