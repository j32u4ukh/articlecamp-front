const userListContainer = document.querySelector('.user-list-container')
const userContainer = document.querySelector('.user-container')
// const userImage = document.querySelector('.user-image')
// const userName = document.querySelector('.user-name')
const followBtn = document.querySelector('.follow-btn')
const homeIcon = document.querySelector('.icon')

const API_URL = `${BASE_URL}/users/:3`

;(function init() {
  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  // TODO: 監聽上一層容器(只有一個)，而非 user-container，querySelector 只會取得第一個 class 為 user-container 的元素
  userContainer.addEventListener('click', (e) => {
    const target = e.target
    if (target === followBtn) {
      let isfollowed = followBtn.classList.toggle('followed')
      followBtn.textContent = isfollowed ? 'Followed' : 'Follow'
      console.log(isfollowed)
    }
  })
})()
