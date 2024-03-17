const navbar = document.querySelector('.nav-bar')
const userid = document.querySelector('#user-id')
// 監聽 navbar
navbar.addEventListener('click', function onNavbarClicked(event) {
  const target = event.target

  if (target.matches('.profile-picture')) {
    const id = Number(target.dataset.id)
    setCookie('articleId', id)
    window.location.href = `./profile.html?id=${id}`
  }
})

function renderUserid() {
  const articleId = getCookie('articleId')
  userid.textContent = `User ID: ${articleId}`
}
renderUserid()
