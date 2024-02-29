const DisplayMode = {
  Block: 'Block',
  List: 'List',
}

const BASE_URL = 'http://localhost:3000'
const API_URL = `${BASE_URL}/articles`
const articleContainer = document.querySelector('#article-container')
const createArticle = document.querySelector('#createButton')
const articles = []
let displayMode = DisplayMode.List

// 參考用
const POSTER_URL = `${BASE_URL}/posters`
const MOVIES_PER_PAGE = 12
const movies = []
const icons = document.querySelector('.icons')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-btn')
const paginator = document.querySelector('#paginator')
const homeIcon = document.querySelector('.icon')
let currentArticles = []
let currentPage = 1

function getMoviesByPage(movies, page) {
  const start = MOVIES_PER_PAGE * (page - 1)
  return movies.slice(start, start + MOVIES_PER_PAGE)
}

// 渲染所有文章
function renderArticles(articles) {
  articleContainer.innerHTML = ''
  let parent
  if (displayMode === DisplayMode.Block) {
    parent = dataPanel
  } else {
    parent = document.createElement('ul')
    parent.classList.add('list-group', 'col-sm-12', 'mb-2')
    articleContainer.appendChild(parent)
  }
  articles.forEach((article) => {
    renderArticle(parent, article)
  })
}

// 渲染單篇文章
function renderArticle(parent, article) {
  let child
  if (displayMode === DisplayMode.Block) {
    child = document.createElement('div')
    child.classList.add('col-sm-3')
    child.innerHTML = ``
  } else {
    child = document.createElement('li')
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
  }
  parent.appendChild(child)
}

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  axios.get(`${API_URL}/${id}`).then((response) => {
    const data = response.data.results
    modalTitle.innerText = data.title
    modalDate.innerText = 'Release date: ' + data.release_date
    modalDescription.innerText = data.description
    modalImage.innerHTML = `<img src="${POSTER_URL}/${data.image}" alt="movie-poster" class="img-fluid">`
  })
}

function addToFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem('favorite-movies')) ?? []
  const movie = movies.find((m) => m.id === id)
  if (favorites.some((m) => m.id === id)) {
    alert(`電影 '${movie.title}' 已收藏`)
  } else {
    favorites.push(movie)
    localStorage.setItem('favorite-movies', JSON.stringify(favorites))
  }
}

function setPaginator(amount) {
  let len = Math.ceil(amount / MOVIES_PER_PAGE)
  let pages = ''
  for (let i = 1; i <= len; i++) {
    pages += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
  }
  paginator.innerHTML = pages
}

// 初始化
;(function init() {
  // 初始化 Cookie 數據結構
  initCookies()

  // 重置搜尋框
  searchInput.value = ''

  // 監聽 articleContainer
  articleContainer.addEventListener('click', function onArticleClicked(event) {
    if (event.target.matches('.read')) {
      const id = Number(event.target.dataset.id)
      console.log(`article id: ${id}`)
      setCookie('articleId', id)
      window.location.href = `./article.html?id=${id}`
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
      // currentMovies = movies;ㄋ
      // setPaginator(movies.length);
      // currentPage = 1;
      // renderArticles(getMoviesByPage(movies, currentPage));
      renderArticles(articles)
    })
    .catch((error) => {
      console.log(error)
    })
})()
