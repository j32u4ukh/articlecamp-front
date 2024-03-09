const articleContent = document.querySelector('.article-content')
const homeIcon = document.querySelector('.icon')
const editArticle = document.querySelector('#editButton')
const title = document.querySelector('.article-title')
const author = document.querySelector('.article-author')
const context = document.querySelector('.article-context')

const articleId = Number(getCookie('articleId'))
const API_URL = `${BASE_URL}/articles/${articleId}`

function renderArticle(data) {
  title.innerHTML = `文章標題: ${data.title}`
  author.innerHTML = `文章作者: ${data.author}`
  context.innerHTML = data.content
}

; (function init() {
  homeIcon.addEventListener('click', () => {
    window.location.href = './index.html'
  })

  // 編輯文章按鈕
  editArticle.addEventListener('click', function () {
    window.location.href = './edit.html'
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


// JavaScript 代碼
document.getElementById('commentForm').addEventListener('submit', function (event) {
  event.preventDefault(); // 防止表單提交

  // 獲取輸入值
  let name = document.getElementById('name').value;
  let comment = document.getElementById('comment').value;

  // 建立留言元素
  let commentElement = document.createElement('div');
  commentElement.innerHTML = '<strong>' + name + '</strong>: ' + comment;

  // 將留言添加到留言列表
  document.getElementById('commentList').appendChild(commentElement);

  // 清空輸入框
  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';

  // 將留言區域高度重置為初始狀態
  document.getElementById('commentForm').classList.remove('expanded');
  document.getElementById('comment').style.height = '100px';
});

// 取消按鈕的事件處理
document.getElementById('cancelButton').addEventListener('click', function () {
  // 清空文字
  document.getElementById('comment').value = '';

  // 將留言區域高度重置為初始狀態
  document.getElementById('commentForm').classList.remove('expanded');
  document.getElementById('comment').style.height = '100px';
});

// 當點擊留言框時，增加高度
document.getElementById('comment').addEventListener('click', function () {
  document.getElementById('commentForm').classList.add('expanded');
});