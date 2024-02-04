const DisplayMode = {
  Block: "Block",
  List: "List",
};

const BASE_URL = "http://localhost:3000";
const API_URL = `${BASE_URL}/articles`;
const articleContainer = document.querySelector("#article-container");
const articles = [];
let displayMode = DisplayMode.List;

// 參考用
const POSTER_URL = `${BASE_URL}/posters`;
const MOVIES_PER_PAGE = 12;
const movies = [];
const icons = document.querySelector(".icons");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#serach-input");
const paginator = document.querySelector("#paginator");
let currentMovies = [];
let currentPage = 1;

function getMoviesByPage(movies, page) {
  const start = MOVIES_PER_PAGE * (page - 1);
  return movies.slice(start, start + MOVIES_PER_PAGE);
}

// 渲染所有文章
function renderArticles(articles) {
  articleContainer.innerHTML = "";
  let parent;
  if (displayMode === DisplayMode.Block) {
    parent = dataPanel;
  } else {
    parent = document.createElement("ul");
    parent.classList.add("list-group", "col-sm-12", "mb-2");
    articleContainer.appendChild(parent);
  }
  articles.forEach((article) => {
    renderArticle(parent, article);
  });
}

// 渲染單篇文章
function renderArticle(parent, article) {
  let child;
  if (displayMode === DisplayMode.Block) {
    child = document.createElement("div");
    child.classList.add("col-sm-3");
    child.innerHTML = ``;
  } else {
    child = document.createElement("li");
    child.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "article"
    );
    let preview = article.content.substring(0, 20);
    if (article.content.length > 20) {
      preview += "...";
    }
    child.innerHTML = `
    <div class="article-left">
      <div class="author">
        <div class="author-img">
          <img src="author-img.png" />
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
      </div>
      <div class="status">
          <i class="fa-solid fa-comment comment"> 88</i>
          <i class="fa-solid fa-thumbs-up like"> 49</i>
          <i class="fa-solid fa-thumbs-down dislike"> 3</i>
          <i class="fa-solid fa-heart favorite"> 7</i>
      </div>
    </div>`;
  }
  parent.appendChild(child);
}

function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");
  axios.get(`${API_URL}/${id}`).then((response) => {
    const data = response.data.results;
    modalTitle.innerText = data.title;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${POSTER_URL}/${data.image}" alt="movie-poster" class="img-fluid">`;
  });
}

function addToFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem("favorite-movies")) ?? [];
  const movie = movies.find((m) => m.id === id);
  if (favorites.some((m) => m.id === id)) {
    alert(`電影 '${movie.title}' 已收藏`);
  } else {
    favorites.push(movie);
    localStorage.setItem("favorite-movies", JSON.stringify(favorites));
  }
}

function setPaginator(amount) {
  let len = Math.ceil(amount / MOVIES_PER_PAGE);
  let pages = "";
  for (let i = 1; i <= len; i++) {
    pages += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
  }
  paginator.innerHTML = pages;
}

function init() {
  // 監聽 articleContainer
  articleContainer.addEventListener("click", function onArticleClicked(event) {
    if (event.target.matches(".read")) {
      const id = Number(event.target.dataset.id);
      localStorage.setItem("article-id", String(id));
      window.location.href = "./article.html";
      console.log(`article id: ${localStorage.getItem("article-id")}`);
    }
  });

  // searchForm.addEventListener("submit", function onSearch(event) {
  //   // 避免表單提交後的預設行為(重整頁面)
  //   event.preventDefault();
  //   let input = searchInput.value.trim().toLowerCase();
  //   currentMovies = movies.filter((movie) => {
  //     return movie.title.toLowerCase().includes(input);
  //   });

  //   currentMovies = currentMovies.length === 0 ? movies : currentMovies;
  //   setPaginator(currentMovies.length);
  //   currentPage = 1;
  //   renderArticles(getMoviesByPage(currentMovies, currentPage));
  // });

  // paginator.addEventListener("click", function onPageSelected(event) {
  //   event.preventDefault();
  //   let target = event.target;

  //   if (target.matches(".page-item")) {
  //     let a = target.children[0];
  //     currentPage = Number(a.innerHTML);
  //     renderArticles(getMoviesByPage(currentMovies, currentPage));
  //   } else if (target.matches(".page-link")) {
  //     currentPage = Number(target.innerHTML);
  //     renderArticles(getMoviesByPage(currentMovies, currentPage));
  //   }
  // });

  // icons.addEventListener("click", function onIconClicked(event) {
  //   let target = event.target;
  //   let needRender = false;
  //   if (target.matches(".fa-bars") && displayMode !== DisplayMode.List) {
  //     needRender = true;
  //     displayMode = DisplayMode.List;
  //   } else if (target.matches(".fa-th") && displayMode !== DisplayMode.Block) {
  //     needRender = true;
  //     displayMode = DisplayMode.Block;
  //   }
  //   if (needRender) {
  //     renderArticles(getMoviesByPage(currentMovies, currentPage));
  //   }
  // });

  axios
    .get(API_URL)
    .then((response) => {
      let datas = response.data;
      articles.push(...datas);
      // currentMovies = movies;
      // setPaginator(movies.length);
      // currentPage = 1;
      // renderArticles(getMoviesByPage(movies, currentPage));
      renderArticles(articles);
    })
    .catch((error) => {
      console.log(error);
    });
}

init();
