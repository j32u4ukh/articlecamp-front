const articleContent = document.querySelector('.article-content')
const homeIcon = document.querySelector('.icon')
const editArticle = document.querySelector('#editButton')
const title = document.querySelector('.article-title')
const author = document.querySelector('.article-author')
const context = document.querySelector('.article-context')

// 留言區
const commentForm = document.querySelector('#commentForm')
const commentInput = document.querySelector('#comment')
const commentList = document.querySelector('#commentList')
const cancelButton = document.querySelector('#cancel-button')
const submitButton = document.querySelector('#submit-comment-button')

const articleId = Number(getCookie('articleId'))
const API_URL = `${BASE_URL}/articles/${articleId}`

// 留言 api
const MESSAGE_URL = `${BASE_URL}/articles/${articleId}/messages`

function renderArticle(data) {
  title.innerHTML = `文章標題: ${data.title}`
  author.innerHTML = `文章作者: ${data.author}`
  context.innerHTML = data.content
}

;(function init() {
  homeIcon.addEventListener('click', () => {
    window.location.href = './index.html'
  })

  // 編輯文章按鈕
  editArticle.addEventListener('click', function () {
    window.location.href = './edit.html'
  })

  commentForm.addEventListener('submit', function (event) {
    event.preventDefault() // 防止表單提交
  })

  // 留言按鈕
  submitButton.addEventListener('click', function () {
    comment = commentInput.value.trim()

    if (comment !== '') {
      // 發送新增留言API
      axios
        .post(MESSAGE_URL, {
          // 請求格式
          content: comment,
        })
        .then((res) => {
          // Create comment element
          let commentElement = document.createElement('div')
          commentElement.classList.add('historical-commenter')
          // API-v2 res 數據格式 新增 comment
          commentElement.innerHTML = `<div class="historical-commenter">
        <div class="commenter-container">
          <div class="historical-commenter-img">
            <img src="../data/Alex.png" />
          </div>
          <div class="historical-commenter-name">Alex
          </div>
        </div>
            <div class="message"> ${res.content}</div>
      </div>`

          commentList.append(commentElement)

          // 清空留言區
          commentInput.value = ''
          // 有留言時歷史留言區才顯示
          commentList.style.display = 'flex'
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })

  // 點擊留言框後高度增加。取消按鈕清空文字並恢復留言框高度。
  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', (e) => {
      if (e.target === commentInput) {
        // 點選留言框時增加高度
        commentForm.classList.add('expanded')
      } else if (e.target !== commentInput && e.target !== cancelButton) {
        // 點到留言框及取消按鈕以外恢復留言框高度
        commentForm.classList.remove('expanded')
      } else {
        // 點選取消按鈕時清空文字並恢復留言框高度
        commentInput.value = ''
        commentForm.classList.remove('expanded')
      }
    })
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
