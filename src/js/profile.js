const userid = document.querySelector('#user-id')
const cancelbtn = document.querySelector('#cancel-btn')
const homeIcon = document.querySelector('.icon')
const nameInput = document.querySelector('#user-name input')
const emailInput = document.querySelector('#email input')
const image = document.querySelector('#profile-image')
const uploadbtn = document.querySelector('#upload-btn')
const fileUpload = document.querySelector('#file-upload')
const PROFILE_URL = `${BASE_URL}/users/profile`
// 獲取原始的用戶名和 email
let user = COOKIE.get('user')
// 從cookie取得token
const token = COOKIE.get('token')

function renderUserId() {
  console.log(`user: ${JSON.stringify(user)}`)
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

  // 監聽 uploadbtn
  uploadbtn.addEventListener('click', () => {
    fileUpload.click()
  })

  fileUpload.addEventListener('change', function upload(event) {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    const token = COOKIE.get('token')
    axios
      .patch(PROFILE_URL, formData, {headers: { authorization: `Bearer ${token}` }, })
      .then((response) => {
        const data = response.data
        user.image = data.image
        console.log(`user.image: ${user.image}`)
        COOKIE.set('user', user)
        renderUserId()
      })
      .catch((error) => {
        console.error(error)
      })
  })
  renderUserId()
})()
