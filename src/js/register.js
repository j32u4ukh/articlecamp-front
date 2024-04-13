const registerSubmit = document.querySelector('#registerSubmit')
const registerErrorMsg = document.querySelector('#registerErrorMsg')
const nameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const repasswordInput = document.getElementById('repassword')
const API_URL = `${BASE_URL}/register`

// 註冊 submit 監聽器
registerSubmit.addEventListener('click', (event) => {
  // event.preventDefault()
  const username = nameInput.value.trim()
  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()
  const repassword = repasswordInput.value.trim()
  registerErrorMsg.textContent = ''

  //密碼 與 確認密碼 需相同
  if (password === repassword) {
    if (
      username.trim() &&
      email.trim() &&
      password.trim() &&
      repassword.trim()
    ) {
      axios
        .post(`${API_URL}`, {
          name: username,
          email: email,
          password: password,
          repassword: repassword,
        })
        .then((response) => {
          console.log('註冊成功')
          window.location.href = `./login.html`
        })
        .catch((error) => {
          const errorMsg = error.response.data.msg
          registerErrorMsg.textContent = errorMsg
        })
    } else {
      registerErrorMsg.textContent = '所有欄位都需填寫、不能為空白'
    }
  } else {
    registerErrorMsg.textContent = '密碼需一致'
  }
})
