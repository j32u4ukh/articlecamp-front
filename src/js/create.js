const submitButton = document.querySelector('.submit-btn')
const articleTitle = document.querySelector('#article-title')
const articleAuthor = document.querySelector('#article-author')
const articleContext = document.querySelector('#article-context')
const cancelButton = document.querySelector('.cancel-btn')
const homeIcon = document.querySelector('.icon')
const navbar = document.querySelector('.nav-bar')
const API_URL = `${BASE_URL}/articles/create`

// 取得下拉選單區塊
const articleCategory = document.querySelector('.article-category')

// 根據 getCookie 的 category 數據， 動態新增新的選項並設定value屬性
function renderCategory() {
  // 取得 StringCookie 並轉換型態
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
    // console.log(`value: ${newOption.value}, name: ${newOption.textContent}`)
  }
}

// 新增文章後，送出 API 請求
// 新增 category 參數
function createArticleAPI(author, title, content, category) {
  axios
    .post(API_URL, {
      author,
      title,
      content,
      category,
    })
    .then((res) => {
      console.log(`res: ${JSON.stringify(res.data)}`)
      // window.location.href = './index.html'
    })
    .catch((error) => {
      console.log(error)
    })
}

// // 監聽 navbar
// navbar.addEventListener('click', function onNavbarClicked(event) {
//   const target = event.target

//   if (target.matches('.profile-picture')) {
//     const id = Number(target.dataset.id)
//     setCookie('articleId', id)
//     window.location.href = `./profile.html?id=${id}`
//   }
// })

// 新增文章按鈕，按下後，確認欄位填寫，新增文章
// 0317 新增category 參數
submitButton.addEventListener('click', function createArticleClicked(event) {
  const title = articleTitle.value.trim()
  const author = articleAuthor.value.trim()
  const content = articleContext.value.trim()
  const category = articleCategory.value
  // console.log(`category: ${category}`)
  if (title.length === 0 || author.length === 0 || content.length === 0) {
    alert('文章標題、文章作者、文章內容皆不得空白!')
  } else {
    createArticleAPI(author, title, content, category)
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
