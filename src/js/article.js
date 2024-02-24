const articleId = Number(getCookie('articleId'))
const BASE_URL = 'http://localhost:3000'
const API_URL = `${BASE_URL}/articles/${articleId}`
const articleContent = document.querySelector('.article-content')

let href = new URL(window.location.href)
console.log(`window.location.href: ${window.location.href}`)

// 使用 URL 對象創建 URLSearchParams 對象
let urlParams = href.searchParams
console.log(`urlParams: ${urlParams}`)

// 獲取特定參數的值
let parameterValue = urlParams.get('id')

// 打印參數值
console.log(`parameterValue: ${parameterValue}`)

function renderArticle(data) {
  articleContent.innerHTML = `<h1 class="article-title">文章標題: ${data.title}</h1>
    <h3 class="article-author">文章作者: ${data.author}</h3>
    <div class="article-context">
      文章內容:
      <article>
        ${data.content}
      </article>
    </div>`
}

function getCookies() {
  const datas = document.cookie.split(';')
  let cookies = {}
  const options = []
  datas.forEach((data) => {
    if (data.includes('=')) {
      const [key, value] = data.split('=')
      if (key === 'data') {
        cookies = JSON.parse(value)
      } else {
        options.push(data)
      }
    } else {
      options.push(data)
    }
  })
  return [cookies, options]
}

function getCookie(key) {
  const [cookies, _] = getCookies()
  return cookies[key]
}

function setCookie(key, value) {
  const [cookies, options] = getCookies()
  cookies[key] = value
  options.push(`data=${JSON.stringify(cookies)}`)
  document.cookie = options.join(';')
}

axios
  .get(API_URL)
  .then((response) => {
    const data = response.data
    // console.log(data)
    // console.log(typeof data)
    renderArticle(data)
  })
  .catch((error) => {
    console.log(error)
  })
