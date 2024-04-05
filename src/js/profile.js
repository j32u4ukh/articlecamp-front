const navbar = document.querySelector('.nav-bar')
const userid = document.querySelector('#user-id')
const cancelbtn = document.querySelector('#cancel-btn')
const homeIcon = document.querySelector('.icon')

// 獲取原始的用戶名和 email
const originalUsername = 'UserName' // 替換為載入時獲取的原始用戶名
const originalEmail = 'abc@email.com' // 替換為載入時獲取的原始 email

function renderUserId() {
  const userId = getCookie('userId')
  userid.textContent = `User ID: ${userId}`

  // 將用戶名和 email 載入
  document.querySelector('#user-name input').value = originalUsername
  document.querySelector('#email input').value = originalEmail
}

;(function init() {
  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  // // 監聽 navbar
  // navbar.addEventListener('click', function onNavbarClicked(event) {
  //   // NOTE: target 會是實際被點擊的元素，而非外層的 div 標籤
  //   const target = event.target
  //   console.log(target)
  //   console.log(target.classList)
  //   console.log('icon => ' + target.classList.contains('icon'))
  //   console.log(
  //     'profile-picture => ' + target.classList.contains('profile-picture')
  //   )
  // })

  // 監聽 cancelbtn
  cancelbtn.addEventListener('click', function onCancelBtnClicked() {
    // 將用戶名和 email 載入原始值
    document.querySelector('#user-name input').value = originalUsername
    document.querySelector('#email input').value = originalEmail
  })

  renderUserId()
})()
