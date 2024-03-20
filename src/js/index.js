const articleContainer = document.querySelector('#article-container')
const createArticle = document.querySelector('#createButton')
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-btn')
const homeIcon = document.querySelector('.icon')
const navbar = document.querySelector('.nav-bar')
const API_URL = `${BASE_URL}/articles`
const articles = []
// 總文章篇數
let total = 0
// 取得文章位移值
let offset = 0
// 取得文章篇數
const size = 10
//////////無限下滑//////////
// 頁面載入後渲染文章篇數及下滑後新增篇數(可任意調整)
// document.body.scrollHeight > window.innerHeight
// const articleCount = 10 // 參考:VH為695時,最低值為6
// 滑動觸發前的Y軸值
// let previousY = 0
// 已渲染總篇數
// let scrollCount = articleCount
//////////無限下滑//////////

// 渲染所有文章
function renderArticles(articles) {
  // 無限下滑:每次只插入新增文章篇數
  // articleContainer.innerHTML = ''
  // const parent = document.createElement('ul')
  // parent.classList.add('list-group', 'col-sm-12', 'mb-2')
  // articleContainer.appendChild(parent)
  articles.forEach((article) => {
    renderArticle(article)
  })
  if (total > offset) {
    const lastArticle = articleContainer.lastChild
    // 設置IntersectionObserver
    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          console.log('觸發成功: 渲染新文章')
          console.log(`offset: ${offset}`)
          console.log(`size: ${size}`)
          // 關閉觀察
          observer.unobserve(lastArticle)
          // 發送請求
          axios
            .get(`${API_URL}?offset=${offset}&size=${size}`)
            .then((response) => {
              const data = response.data
              const articles = data.articles
              // 渲染新文章
              renderArticles(articles)
              // 更新位移值
              offset += size
            })
            .catch((error) => {
              console.error(error)
            })
        }
      },
      { threshold: 1 } // 預設為0,0是觀察對象上方,1是下方
    )
    // 啟動觀察
    observer.observe(lastArticle)
  }
}

// NOTE: 目前高度沒有考慮到 Header
// TODO: 嘗試使用 IntersectionObserver 實作無限下滑
// TODO: 每次到底部時，再觸發 axios 發送請求後面的文章數據
// window.addEventListener('scroll', () => {
//   // 總滾動高度(此高度比實際最高 Y 軸值多一個 VH 的值)
//   // document.documentElement.scrollHeight: 用於獲取當前文檔的根元素（即 <html> 元素）的整個高度。這個值包括了所有文檔內容的高度，即使該內容超出了當前可見區域，也會被計算在內。
//   const scrollHeight = document.documentElement.scrollHeight
//   // VH 值
//   // window.innerHeight: 用於獲取當前瀏覽器視窗的內部高度，即瀏覽器窗口中可見內容的高度，不包括工具欄、地址欄、滾動條等非內容區域的高度。
//   const innerHeight = window.innerHeight
//   const offset = 10
//   // 觸發點(減 offset 是為了避免 Y 軸值的誤差可能造成的錯誤)
//   const triggerPoint = scrollHeight - innerHeight - offset
//   // 當下 Y 軸值
//   // window.scrollY 和 window.pageYOffset 都是 JavaScript 中用於獲取當前頁面垂直方向上滾動的距離的屬性。它們兩者的作用是相同的，都用於獲取用戶在垂直方向上滾動的距離，即滾動條距離視窗頂部的距離。
//   const scrollY = window.scrollY || window.pageYOffset
//   // 總文章篇數
//   const articlesLength = articles.length
//   // 條件 1: 預防網頁刷新後沒有跑回原點(Y = 0)且誤觸新增新文章篇數的渲染
//   // 如刷新後 scrollbar 介於觸發點之下, 且使用者向上滑動, 新文章篇數會被渲染
//   // 條件 2: 當下 Y 軸值大於觸發點
//   // 條件 3: 欲渲染篇數小於總文章數(避免無謂觸發)
//   if (
//     scrollY > previousY &&
//     scrollY > triggerPoint &&
//     scrollCount < articlesLength
//   ) {
//     console.log(`新增前篇數: ${scrollCount}`)
//     // 渲染文章篇數調整, 如剩餘渲染篇數較少, 只多渲染該數量
//     scrollCount =
//       articlesLength - scrollCount > articleCount
//         ? (scrollCount += articleCount)
//         : articlesLength

//     console.log(`新增後篇數: ${scrollCount}`)
//     renderArticles(articles.slice(scrollCount, scrollCount + articleCount))
//     console.log(`From: ${scrollCount}, To: ${scrollCount + articleCount}`)
//   }
//   // scroll 事件觸發前的 Y 軸值
//   previousY = window.scrollY || window.pageYOffset
// })

// 渲染單篇文章
function renderArticle(article) {
  const child = document.createElement('li')
  child.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'article', 'c-border')
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
  const category = getCookie('categoryArrayCookie')
  if (category === undefined) {
    axios
      .get(`${API_URL}/categories`)
      .then((response) => {
        const DATA = JSON.stringify(response.data)
        setCookie('categoryArrayCookie', DATA)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

// 初始化
;(function init() {
  // 初始化 Cookie 數據結構
  initCookies()

  // 取得文章分類列表並記入 Cookie
  setCategoryCookie()

  // 重置搜尋框
  searchInput.value = ''

  // 監聽 navbar
  navbar.addEventListener('click', function onNavbarClicked(event) {
    const target = event.target

    if (target.matches('.profile-picture')) {
      const id = Number(target.dataset.id)
      setCookie('articleId', id)
      window.location.href = `./profile.html?id=${id}`
    }
  })
  // 監聽 articleContainer
  articleContainer.addEventListener('click', function onArticleClicked(event) {
    const target = event.target

    if (target.matches('.read')) {
      const id = Number(target.dataset.id)
      setCookie('articleId', id)
      window.location.href = `./article.html?id=${id}`
    } else if (target.matches('.edit-btn')) {
      const id = Number(target.dataset.id)
      setCookie('articleId', id)
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
      .get(url)
      .then((response) => {
        let datas = response.data
        articles.splice(0, articles.length)
        articles.push(...datas.articles)
        renderArticles(articles)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  axios
    .get(API_URL)
    .then((response) => {
      let datas = response.data
      console.log(datas)
      console.log(`offset: ${datas.offset}`)
      console.log(`size: ${datas.size}`)
      // 總文章篇數
      total = datas.total
      // 更新位移值
      offset = datas.size
      articles.push(...datas.articles)
      // 頁面載入後渲染特定文章篇數
      renderArticles(articles)
    })
    .catch((error) => {
      console.log(error)
    })
})()
