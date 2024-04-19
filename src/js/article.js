const editArticle = document.querySelector('#editButton')
const title = document.querySelector('.article-title')
const author = document.querySelector('.article-author')
const context = document.querySelector('.article-context')
const category = document.querySelector('#show-category')
const navbar = document.querySelector('.nav-bar')
// 留言區
const commenterImg = document.querySelector('.commenter-img img')
const commenterName = document.querySelector('.commenter-name')
const commentForm = document.querySelector('#commentForm')
const commentInput = document.querySelector('#comment')
const commentList = document.querySelector('#commentList')
const cancelButton = document.querySelector('#cancel-button')
const submitButton = document.querySelector('#submit-comment-button')

const articleId = Number(COOKIE.get('articleId'))
const API_URL = `${BASE_URL}/articles/${articleId}`
const MESSAGE_URL = `${BASE_URL}/articles/${articleId}/messages`

let total = 0
let offset = 0
const size = 10

// 從 cookie 取得 token
const token = COOKIE.get('token')

// user
const user = COOKIE.get('user')

function renderArticle(data) {
  // cookie data
  const categories = COOKIE.get('category')
  console.log(`categories: ${JSON.stringify(categories)}`)
  console.log(`data: ${JSON.stringify(data)}`)
  const categoryArray = categories.filter((e) => e.id === data.category)
  const categoryName = categoryArray[0].name
  title.innerHTML = `文章標題: ${data.title}`
  author.innerHTML = `文章作者: ${data.name}`
  category.innerHTML = `文章分類: ${categoryName}`
  context.innerHTML = data.content

  // 留言區
  commenterImg.src = `${BASE_URL}/users/images/${user.id}/${user.image}`
  commenterName.innerHTML = user.name
}

// 渲染留言列表
function renderMessages(messages) {
  messages.forEach((message) => {
    renderMessage(message)
  })
}

function renderMessage(message, prepend = false) {
  let comment = document.createElement('div')
  comment.classList.add('historical-commenter')
  comment.innerHTML = `<div class="historical-commenter">
        <div class="commenter-container">
          <div class="historical-commenter-img">
            <img src="${BASE_URL}/users/images/${message.userId}/${message.image}" />
          </div>
          <div class="historical-commenter-name">${message.name}</div>
        </div>
            <div class="message"> ${message.content}</div>
      </div>`

  if (prepend) {
    commentList.prepend(comment)
  } else {
    commentList.append(comment)
  }
}

;(function init() {
  renderHeader()

  // 編輯文章按鈕
  editArticle.addEventListener('click', function () {
    window.location.href = './edit.html'
  })

  commentForm.addEventListener('submit', function (event) {
    event.preventDefault() // 防止表單提交
  })

  axios
    .get(`${MESSAGE_URL}?offset=${offset}&size=${size}`, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => {
      // GET 留言列表
      // console.log(res)
      const DATA = res.data
      const messages = DATA.datas
      total = DATA.total
      offset += messages.length
      console.log(messages)
      renderMessages(messages)

      // MoreMessageBTN
      let messageLangth = messages.length
      console.log(messageLangth)
      if (messageLangth >= offset) {
        const moreMessageBTN = document.createElement('button')
        moreMessageBTN.innerText = '更多留言'
        commentList.appendChild(moreMessageBTN)
        moreMessageBTN.addEventListener('click', () => {
          axios
            .get(`${MESSAGE_URL}?offset=${offset}&size=${size}`, {
              headers: { authorization: `Bearer ${token}` },
            })
            .then((res) => {
              // GET 留言列表，更新留言數據
              const newdata = res.data
              total = newdata.total
              const messages = newdata.datas
              offset += messages.length
              renderMessages(messages)
            })
        })
      }
    })

  // 留言按鈕
  submitButton.addEventListener('click', function () {
    comment = commentInput.value.trim()

    if (comment !== '') {
      // 發送新增留言API
      axios
        // header新增token
        .post(
          MESSAGE_URL,
          {
            // 請求格式
            content: comment,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          return res.data
        })
        .then((data) => {
          // 渲染留言數據
          renderMessage(data, true)

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
    .get(API_URL, { headers: { authorization: `Bearer ${token}` } })
    .then((response) => {
      const data = response.data
      renderArticle(data)
    })
    .catch((error) => {
      console.log(error)
    })
})()
