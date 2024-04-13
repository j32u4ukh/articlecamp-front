const loginSubmit = document.querySelector('#loginSubmit')
const loginErrorMsg = document.querySelector('#loginErrorMsg')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const API_URL = `${BASE_URL}/login`

// 登入 submit 監聽器
loginSubmit.addEventListener('click', (event) => {
  // event.preventDefault();
  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()
  loginErrorMsg.textContent = ''
  axios
    .post(`${API_URL}`, { email: email, password: password })
    .then((response) => {
      const data = response.data
      const token = data.token
      // 紀錄返回的 JWT
      COOKIE.set('token', token)
      const parts = token.split('.')
      const payload = JSON.parse(atob(parts[1]))
      COOKIE.set('user', payload.user)
      window.location.href = `./index.html`
    })
    .catch((error) => {
      const errorMsg = error.response.data.msg
      loginErrorMsg.textContent = errorMsg
    })
})
