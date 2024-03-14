const articleContainer = document.querySelector('#article-container')
const createArticle = document.querySelector('#createButton')
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-btn')
const homeIcon = document.querySelector('.icon')
const API_URL = `${BASE_URL}/articles`
const articles = []
//////////無限下滑//////////
// 頁面載入後渲染文章篇數及下滑後新增篇數(可任意調整)
// document.body.scrollHeight > window.innerHeight
const articleCount = 10 // 參考:VH為695時,最低值為6
// 滑動觸發前的Y軸值
let previousY = 0
// 已渲染總篇數
let scrollCount = articleCount
//////////無限下滑//////////

// 渲染所有文章
function renderArticles(articles) {
  // 無限下滑:每次只插入新增文章篇數
  // articleContainer.innerHTML = ''
  const parent = document.createElement('ul')
  parent.classList.add('list-group', 'col-sm-12', 'mb-2')
  articleContainer.appendChild(parent)
  articles.forEach((article) => {
    renderArticle(parent, article)
  })
}

window.addEventListener('scroll', () => {
  // 總滾動高度(此高度比實際最高Y軸值多一個VH的值)
  const scrollHeight = document.documentElement.scrollHeight
  // VH值
  const innerHeight = window.innerHeight
  // 觸發點(減10是為了避免Y軸值的誤差可能造成的錯誤)
  const triggerPoint = scrollHeight - innerHeight - 10
  // 當下Y軸值
  const scrollY = window.scrollY || window.pageYOffset
  // 總文章篇數
  const articlesLength = articles.length
  // 條件1: 預防網頁刷新後沒有跑回原點(Y=0)且誤觸新增新文章篇數的渲染
  // 如刷新後scrollbar介於觸發點之下,且使用者向上滑動,新文章篇數會被渲染
  // 條件2: 當下Y軸值大於觸發點
  // 條件3: 欲渲染篇數小於總文章數(避免無謂觸發)
  if (scrollY > previousY && scrollY > triggerPoint && scrollCount < articlesLength) {
    console.log(`新增前篇數: ${scrollCount}`)
    // 渲染文章篇數調整,如剩餘渲染篇數較少,只多渲染該數量
    scrollCount =
      articlesLength - scrollCount > articleCount ? (scrollCount += articleCount) : articlesLength
    renderArticles(articles.slice(scrollCount, scrollCount + articleCount))
    console.log(`新增後篇數: ${scrollCount}`)
  }
  // scroll事件觸發前的Y軸值
  previousY = window.scrollY || window.pageYOffset
})

// 渲染單篇文章
function renderArticle(parent, article) {
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
  parent.appendChild(child)
}

// 初始化
;(function init() {
  // 初始化 Cookie 數據結構
  initCookies()

  // 重置搜尋框
  searchInput.value = ''

  // 監聽 articleContainer
  articleContainer.addEventListener('click', function onArticleClicked(event) {
    const id = Number(event.target.dataset.id)
    console.log(`article id: ${id}`)

    if (event.target.matches('.read')) {
      setCookie('articleId', id)
      window.location.href = `./article.html?id=${id}`
    } else if (event.target.matches('.edit-btn')) {
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
        articles.push(...datas)
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
      articles.push(...datas)
      // currentMovies = movies;
      // setPaginator(movies.length);
      // currentPage = 1;
      // renderArticles(getMoviesByPage(movies, currentPage));
      // 頁面載入後渲染特定文章篇數
      renderArticles(articles.slice(0, articleCount))
    })
    .catch((error) => {
      console.log(error)
    })
})()
