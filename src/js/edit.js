const BASE_URL = 'http://localhost:3000'
const API_URL = `${BASE_URL}/articles`

const submitBtn = document.querySelector('.submit-btn')
const originalArticle = {}
let currentArticle = {}

function init() {
  const articleInput = document.querySelectorAll('.article-content input')
  articleInput.forEach((element) => {
    let key = element.dataset.key
    originalArticle[key] = element.value
    console.log(originalArticle)
    currentArticle[key] = element.value
    element.addEventListener('input', (e) => {
      const target = e.target
      key = target.dataset.key
      currentArticle[key] = element.value
    })
  })
  submitBtn.addEventListener('click', (e) => {
    const target = e.target
    const origial = Object.values(originalArticle)
    const current = Object.values(currentArticle)
    const check = origial.some((value, index) => {
      return value === current[index]
    })
    if (!check) {
      console.log('Content updated, ready to submit.')
    } else {
      console.log("Didn't update any content.")
    }
    axios
      .put(API_URL)
      .then((response) => {
        // ??
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

init()

// cancel-btn，回到article.html
const cancelArticle = document.querySelector('.cancel-btn')
cancelArticle.addEventListener('click', function (event) {
  console.log(event)

  window.location.href = "../html/article.html"
})
