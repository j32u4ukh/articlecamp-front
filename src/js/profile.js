const userid = document.querySelector('#user-id')
const cancelbtn = document.querySelector('#cancel-btn')
const nameInput = document.querySelector('#user-name input')
const email = document.querySelector('#email')
const image = document.querySelector('#profile-image')
const uploadbtn = document.querySelector('#upload-btn')
const fileUpload = document.querySelector('#file-upload')
const PROFILE_URL = `${BASE_URL}/users/profile`
// 獲取原始的用戶名和 email
let user = COOKIE.get('user')
// 從 cookie 取得 token
const token = COOKIE.get('token')

function renderUserId() {
  console.log(`user: ${JSON.stringify(user)}`)
  /* innerText 和 textContent 通常都被使用於「取得元素內的文字」時。
  innerText 取得的是被 CSS 調整過樣式後渲染的文字；
  textContent 則是實際取得節點中的文字內容。
  由於 innerText 需要經由 layout 確定使用者所見，效能會較 textContent 差，不過這要在資料非常龐大的時候才能看出毫秒的區別。 */
  userid.textContent = `User ID: ${user.id}`

  // 將用戶名和 email 載入
  nameInput.value = user.name
  email.textContent = `Email: ${user.email}`
  image.src = `${BASE_URL}/users/images/${user.id}/${user.image}`
}

;(function init() {
  // 監聽 cancelbtn
  cancelbtn.addEventListener('click', function onCancelBtnClicked() {
    // 將用戶名和 email 載入原始值
    nameInput.value = user.name
    image.src = `${BASE_URL}/users/images/${user.id}/${user.image}`
  })

  // 監聽 uploadbtn
  uploadbtn.addEventListener('click', () => {
    fileUpload.click()
  })

  // TODO: 按下 uploadbtn 才真的送出請求
  fileUpload.addEventListener('change', function upload(event) {
    const file = event.target.files[0]
    image.src = file
    const formData = new FormData()
    formData.append('image', file)
    const token = COOKIE.get('token')
    axios
      .patch(PROFILE_URL, formData, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data
        user.image = data.image
        console.log(`user.image: ${user.image}`)
        COOKIE.set('user', user)

        // 重新載入當前頁面，忽略緩存
        location.reload(true)
      })
      .catch((error) => {
        console.error(error)
      })
  })

  renderHeader()
  renderUserId()
})()
