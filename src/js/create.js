const submitButton = document.querySelector('.submit-btn')
const articleTitle = document.querySelector('#article-title')
const articleAuthor = document.querySelector('#article-author')
const articleContext = document.querySelector('#article-context')
const cancelButton = document.querySelector('.cancel-btn')
const homeIcon = document.querySelector('.icon')
const API_URL = `${BASE_URL}/articles/create`

// 新增文章後，送出 API 請求
function createArticleAPI(author, title, content) {
  axios
    .post(API_URL, {
      author,
      title,
      content,
    })
    .then((response) => {
      // console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      window.location.href = './index.html'
    })
}

// 新增文章按鈕，按下後，確認欄位填寫，新增文章
submitButton.addEventListener('click', function createArticleClicked(event) {
  const title = articleTitle.value.trim()
  const author = articleAuthor.value.trim()
  const content = articleContext.value.trim()
  if (title.length === 0 || author.length === 0 || content.length === 0) {
    alert('文章標題、文章作者、文章內容皆不得空白!')
  } else {
    createArticleAPI(author, title, content)
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
