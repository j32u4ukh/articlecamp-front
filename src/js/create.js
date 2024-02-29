const BASE_URL = 'http://localhost:3000'
const API_URL = `${BASE_URL}/articles/create`

const submitButton = document.querySelector('.submit-btn')
const articleTitle = document.querySelector('#article-title')
const articleAuthor = document.querySelector('#article-author')
const articleContext = document.querySelector('#article-context')
const cancelButton = document.querySelector('.cancel-btn')

// 新增文章後，送出 API 請求
function createArticleAPI(article_Author, article_Title, article_Context) {
  axios
    .post(API_URL, {
      author: article_Author,
      title: article_Title,
      content: article_Context
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}

// 新增文章按鈕，按下後，確認欄位填寫，新增文章
submitButton.addEventListener('click', function createArticleClicked(event) {
  let article_Title = articleTitle.value.trim()
  let article_Author = articleAuthor.value.trim()
  let article_Context = articleContext.value.trim()
  if (
    article_Title.length === 0 ||
    article_Author.length === 0 ||
    article_Context.length === 0
  ) {
    alert('文章標題、文章作者、文章內容皆不得空白!')
  } else {
    createArticleAPI(article_Author, article_Title, article_Context)
  }
})

// 取消新增文章，按下按鈕返回首頁
cancelButton.addEventListener('click', function cancelButtonClicked(event) {
  console.log(event)
  window.location.href = './index.html'
})
