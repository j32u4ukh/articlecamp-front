const userid = document.querySelector('#user-id')
const cancelbtn = document.querySelector('#cancel-btn')
const homeIcon = document.querySelector('.icon')
const nameInput = document.querySelector('#user-name input')
const emailInput = document.querySelector('#email input')
const image = document.querySelector('#profile-image')

// 獲取原始的用戶名和 email
const user = COOKIE.get('user')

function renderUserId() {
  userid.textContent = `User ID: ${user.id}`

  // 將用戶名和 email 載入
  nameInput.value = user.name
  emailInput.value = user.email
  image.src = `${BASE_URL}/users/images/${user.id}/${user.image}`
}

;(function init() {
  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })

  // 監聽 cancelbtn
  cancelbtn.addEventListener('click', function onCancelBtnClicked() {
    // 將用戶名和 email 載入原始值
    nameInput.value = user.name
    emailInput.value = user.email
    image.src = `${BASE_URL}/users/images/${user.id}/${user.image}`
  })

  renderUserId()
})()
