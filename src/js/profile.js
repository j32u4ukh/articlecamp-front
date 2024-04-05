const userid = document.querySelector('#user-id')
const cancelbtn = document.querySelector('#cancel-btn')
const homeIcon = document.querySelector('.icon')
const nameInput = document.querySelector('#user-name input')
const emailInput = document.querySelector('#email input')

// 獲取原始的用戶名和 email
const originalUsername = 'UserName' // 替換為載入時獲取的原始用戶名
const originalEmail = 'abc@email.com' // 替換為載入時獲取的原始 email

function renderUserId() {
  const userId = COOKIE.get('userId')
  userid.textContent = `User ID: ${userId}`

  // 將用戶名和 email 載入
  nameInput.value = originalUsername
  emailInput.value = originalEmail
}

;(function init() {
  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  // 監聽 cancelbtn
  cancelbtn.addEventListener('click', function onCancelBtnClicked() {
    // 將用戶名和 email 載入原始值
    nameInput.value = originalUsername
    emailInput.value = originalEmail
  })

  renderUserId()
})()
