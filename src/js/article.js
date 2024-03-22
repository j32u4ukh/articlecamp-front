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
const MESSAGE_URL = `${BASE_URL}/articles/${articleId}/messages`
const messages = []

let offset = 0
const size = 10

function renderArticle(data) {
  title.innerHTML = `文章標題: ${data.title}`
  author.innerHTML = `文章作者: ${data.author}`
  context.innerHTML = data.content
}

function renderMessage(message) {
  let commentElement = document.createElement('div')
  commentElement.classList.add('historical-commenter')
  commentElement.innerHTML = `<div class="historical-commenter">
        <div class="commenter-container">
          <div class="historical-commenter-img">
            <img src="../data/Alex.png" />
          </div>
          <div class="historical-commenter-name">Alex
          </div>
        </div>
            <div class="message"> ${message.content}</div>
      </div>`

  commentList.prepend(commentElement)
}

// 渲染留言列表
function renderMessages(messages) {
  messages.forEach((message) => {
    renderMessage(message)

  })
  const totalMessage = messages.length
  const LastElement = commentList.lastElementChild
  console.log(LastElement)

  // // intersectionObserver
  const observer = new IntersectionObserver(entry => {
    console.log(entry)
    // axios 再調整offset size

  }
    ,
    { threshold: 1 },
    // { rootMargin: "-100px" }
  )
  console.log(totalMessage)
  console.log(offset)
  if (totalMessage > offset) {
    observer.observe(LastElement)
  }




}

; (function init() {
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


  axios.get(`${MESSAGE_URL}?offset=${offset}&size=${size}`, {
    // offset: 10,
    // size: 10,
  }).then((res) => {
    // GET留言列表
    // console.log(res)
    const data = res.data
    offset = data.size
    console.log(res)
    // ... = 拿掉外面一層陣列
    messages.push(...data.datas)
    console.log(messages)
    renderMessages(messages)


    // MoreMessageBTN
    let messageLangth = messages.length
    console.log(messageLangth)
    if (messageLangth >= 10) {
      const moreMessageBTN = document.createElement('button')
      moreMessageBTN.innerText = '更多留言'
      commentList.appendChild(moreMessageBTN)
      moreMessageBTN.addEventListener('click', () => {
        offset += size
        console.log(messageLangth)
        console.log(offset)
        console.log(size)
        axios.get(`${MESSAGE_URL}?offset=${offset}&size=${size}`, {
          offset: offset
        }).then((res) => {
          // GET留言列表
          // 更新留言數據
          const newdata = res.data
          // ... = 拿掉外面一層陣列
          messages.push(...newdata.datas)
          console.log(messages)
          renderMessages(messages)

        })
      })
    }
  })



  // 留言按鈕
  submitButton.addEventListener('click', function () {
    comment = commentInput.value.trim()

    if (comment !== '') {
      axios.post(MESSAGE_URL, {
        content: comment,
      }).then((res) => {
        console.log(res)
        commemt = res.data.content
        // const UserID = res.data.user_id
        // Create comment element
        let commentElement = document.createElement('div')
        commentElement.classList.add('historical-commenter')
        // commentElement.innerText = comment;
        commentElement.innerHTML = `<div class="historical-commenter">
        <div class="commenter-container">
          <div class="historical-commenter-img">
            <img src="../data/Alex.png" />
          </div>
          <div class="historical-commenter-name">Alex
          </div>
        </div>
            <div class="message"> ${comment}</div>
      </div>`

        commentList.prepend(commentElement)

        // 清空留言區
        commentInput.value = ''
        // // 有留言時歷史留言區才顯示
        // commentList.style.display = 'flex'
      })
        .catch((err) => {
          console.log(err)
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
