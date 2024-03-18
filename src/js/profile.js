const navbar = document.querySelector('.nav-bar')
const userid = document.querySelector('#user-id')
const cancelbtn = document.querySelector('#cancel-btn')

// 監聽 navbar
navbar.addEventListener('click', function onNavbarClicked(event) {
  const target = event.target

  if (target.matches('.profile-picture')) {
    const id = Number(target.dataset.id)
    setCookie('articleId', id)
    window.location.href = `./profile.html?id=${id}`
  }
})

// 監聽 cancelbtn
cancelbtn.addEventListener('click', function onCancelBtnClicked() {
  // 獲取原始的用戶名和郵箱值
  const originalUsername = '原始用戶名' // 替換為載入時獲取的原始用戶名
  const originalEmail = '原始郵箱' // 替換為載入時獲取的原始郵箱

  // 將用戶名和郵箱載入原始值
  document.querySelector('#user-name input').value = originalUsername
  document.querySelector('#email input').value = originalEmail
})

function renderUserId() {
  const articleId = getCookie('articleId')
  userid.textContent = `User ID: ${articleId}`
}

renderUserId()
