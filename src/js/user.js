const userListContainer = document.querySelector('.user-list-container')
const homeIcon = document.querySelector('.icon')
const USERLIST_URL = `${BASE_URL}/users`

// NOTE: 不要在程式碼中途宣告變數，一律在最上方進行宣告
const token = 2

;(function init() {
  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  // NOTE: 監聽器要設置在"上層容器"，每個按鈕都設置監聽器會影響效能
  userListContainer.addEventListener(
    'click',
    function onFollowButtonClicked(e) {
      const target = e.target
      if (target.matches('.follow-btn')) {
        const btnId = target.id
        const isfollowed = target.classList.toggle('followed')
        target.textContent = isfollowed ? 'Followed' : 'Follow'
        console.log(`ID: ${btnId}`)
      }
    }
  )
  // followBtn.forEach((btn) => {
  //   btn.addEventListener('click', (e) => {
  //     const target = e.target
  //     if (target.matches('.follow-btn')) {
  //       const btnId = target.id
  //       const isfollowed = target.classList.toggle('followed')
  //       target.textContent = isfollowed ? 'Followed' : 'Follow'
  //       console.log(`ID:${btnId}`)
  //     }
  //   })
  // })

  // NOTE: 初始化、設置監聽器相關的內容寫在 init() 來進行管理
  document.addEventListener('DOMContentLoaded', function () {
    axios
      .get(USERLIST_URL, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })
})()
