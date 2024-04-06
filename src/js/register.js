const registerSubmit = document.querySelector('#registerSubmit')
const registerErrorMsg = document.querySelector('#registerErrorMsg')
const nameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const repasswordInput = document.getElementById('repassword')
const API_URL = `${BASE_URL}/register`

// 註冊 submit 監聽器
registerSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  // NOTE: 不要重複取得 HTML 的元素，在最上方取得一次後重複使用!!
  // const username = document.getElementById('username').value
  // const email = document.getElementById('email').value
  // const password = document.getElementById('password').value
  // const repassword = document.getElementById('repassword').value
  const username = nameInput.value.trim()
  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()
  const repassword = repasswordInput.value.trim()
  registerErrorMsg.textContent = ''

  //密碼 與 確認密碼 需相同
  if (password === repassword) {
    axios
      .post(`${API_URL}`, {
        name: username,
        email: email,
        password: password,
        repassword: repassword,
      })
      .then((response) => {
        console.log('註冊成功')
      })
      .catch((error) => {
        const errorMsg = error.response.data.msg
        registerErrorMsg.textContent = errorMsg
      })
  } else {
    registerErrorMsg.textContent = '密碼需一致'
  }
})