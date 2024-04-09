const articleContainer = document.querySelector('#article-container')
const createArticle = document.querySelector('#createButton')
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-btn')
const homeIcon = document.querySelector('.icon')
const navbar = document.querySelector('.nav-bar')
const API_URL = `${BASE_URL}/articles`
const articles = []
// 從cookie取得token
const token = COOKIE.get('token')
// 總文章篇數
let total = 0
// 取得文章位移值
let offset = 0
// 取得文章篇數
const size = 10

// 渲染所有文章
function renderArticles(articles) {
  // 無限下滑: 每次只插入新增文章篇數
  articles.forEach((article) => {
    renderArticle(article)
  })
}

// 渲染單篇文章
function renderArticle(article) {
  const child = document.createElement('li')
  child.classList.add(
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'article',
    'c-border'
  )
  let preview = article.content.substring(0, 20)
  if (article.content.length > 20) {
    preview += '...'
  }
  child.innerHTML = `
    <div class="article-left">
      <div class="author">
        <div class="author-img">
          <img src="../data/Alex.png" />
        </div>
        <div class="author-username">${article.author}</div>
      </div>
      <div class="title">${article.title}</div>
      <div class="preview">
       ${preview}
      </div>
    </div>
    <div class="article-right">
      <div class="read-favorite">
          <div class="read" data-id=${article.id}>READ</div>
          <div class="add-to-favorite">
              <i class="fa-regular fa-heart add-to-favorite-btn"></i>
          </div>
          <div class="edit">
              <i class="fa-solid fa-pen-to-square edit-btn" data-id=${article.id}></i>
          </div>
      </div>
      <div class="status">
          <i class="fa-solid fa-comment comment"> 88</i>
          <i class="fa-solid fa-thumbs-up like"> 49</i>
          <i class="fa-solid fa-thumbs-down dislike"> 3</i>
          <i class="fa-solid fa-heart favorite"> 7</i>
      </div>
    </div>`
  articleContainer.appendChild(child)
}

// 取得文章分類數據後，存入 Cookie
function setCategoryCookie() {
  const category = COOKIE.get('category')
  // 若 Cookie 中沒有文章分類數據，才向後端送出請求
  if (category === undefined) {
    axios
      .get(`${API_URL}/categories`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        COOKIE.set('category', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

// 設置 IntersectionObserver
function setIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // 關閉觀察
        observer.unobserve(articleContainer.lastChild)

        // 發送請求
        axios
          // header新增
          .get(`${API_URL}?offset=${offset}&size=${size}`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const DATA = response.data

            // 更新總文章篇數
            total = DATA.total

            // 取得下一批文章數據
            const articles = DATA.datas

            // 渲染新文章
            renderArticles(articles)

            // 更新位移值
            offset += articles.length

            console.log(
              `total: ${total}, offset: ${offset}, #articles: ${articles.length}`
            )

            if (total > offset) {
              // 啟動觀察
              observer.observe(articleContainer.lastChild)
            } else {
              console.log('已全部渲染完成')
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    { threshold: 1 } // 預設為 0, 0 是觀察對象上方, 1 是下方
  )

  // 啟動觀察
  observer.observe(articleContainer.lastChild)
}

// 初始化
;(function init() {
  // 取得文章分類列表並記入 Cookie
  setCategoryCookie()

  const user = COOKIE.get('user')
  COOKIE.set('userId', user.id)

  // 重置搜尋框
  searchInput.value = ''

  // 監聽 articleContainer
  articleContainer.addEventListener('click', function onArticleClicked(event) {
    const target = event.target

    if (target.matches('.read')) {
      const id = Number(target.dataset.id)
      COOKIE.set('articleId', id)
      window.location.href = `./article.html`
    } else if (target.matches('.edit-btn')) {
      const id = Number(target.dataset.id)
      COOKIE.set('articleId', id)
      window.location.href = './edit.html'
    }
  })

  // 新增文章按鈕
  createArticle.addEventListener('click', function onCreateClicked(event) {
    window.location.href = './create.html'
  })

  // 根據關鍵字查詢文章
  searchButton.addEventListener('click', (event) => {
    const input = searchInput.value.trim()
    let url = API_URL
    if (input !== '') {
      url += `?keyword=${input}`
    }
    axios
      // header 新增 token
      .get(url, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response)
        let data = response.data
        articles.splice(0, articles.length)
        articles.push(...data.datas)
        renderArticles(articles)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  // Fake data
  total = FAKE_ARTICLES.total
  // 更新位移值
  offset = FAKE_ARTICLES.size
  articles.push(...FAKE_ARTICLES.datas)
  // 頁面載入後渲染特定文章篇數
  renderArticles(articles)

  // 設置 IntersectionObserver
  setIntersectionObserver()

  axios
    // header新增token
    .get(API_URL, { headers: { authorization: `Bearer ${token}` } })
    .then((response) => {
      // 原始:
      // {total: 3, offset: 0, size: 3, articles: Array(3)}
      // 更新: (ariticles => datas)
      // {total: 3, offset: 0, size: 3, datas: Array(3)}
      // 故將原 datas 改成 data, articles 改成 datas 避免 bad naming
      let data = response.data
      console.log(data)
      console.log(`offset: ${data.offset}`)
      console.log(`size: ${data.size}`)
      // 總文章篇數
      total = data.total
      // 更新位移值
      offset = data.size
      articles.push(...data.datas)

      // 頁面載入後渲染特定文章篇數
      renderArticles(articles)

      // 設置 IntersectionObserver
      setIntersectionObserver()
    })
    .catch((error) => {
      console.log(error)
    })
})()
