//使用getCookie 取得articleId 將String轉型成Number
const articleId = Number(getCookie('articleId'))
//API 主機
const BASE_URL = 'http://localhost:3000'
//根據指定的Id 取得資料
const API_URL = `${BASE_URL}/articles/${articleId}`
//DOM 抓取class article-content
const articleContent = document.querySelector('.article-content')

/*根據getCookie articleId 動態渲染HTML*/
function renderArticle(data) {
  articleContent.innerHTML = `<h1 class="article-title">
          文章標題: <input type="text" value=${data.title} />
        </h1>
        <h3 class="article-author">
          文章作者: <input type="text" value=${data.author} />
        </h3>
        <div class="article-context">
          文章內容:
          <article>
            <input
              type="text"
              value=${data.content}
            />
          </article>
        </div>
        <button class="cancel-btn">Cancel</button>
        <button class="submit-btn">Submit</button>`
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
    renderArticle(data)
  })
  .catch((error) => {
    console.log(error)
  })
