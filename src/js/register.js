const API_URL = `${BASE_URL}/register`

const registerSubmit = document.querySelector('#registerSubmit')
const registerErrorMsg = document.querySelector('#registerErrorMsg')

//註冊submit監聽器
registerSubmit.addEventListener('click', (event) => {
  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const repassword = document.getElementById('repassword').value
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
          registerErrorMsg.textContent = '註冊成功'
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
