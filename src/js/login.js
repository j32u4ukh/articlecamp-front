const loginSubmit = document.querySelector('#loginSubmit')
const loginErrorMsg = document.querySelector('#loginErrorMsg')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const API_URL = `${BASE_URL}/login`

// 登入 submit 監聽器
loginSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  // NOTE: 不要重複取得 HTML 的元素，在最上方取得一次後重複使用!!
  // const email = document.getElementById('email').value
  // const password = document.getElementById('password').value
  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()
  loginErrorMsg.textContent = ''
  axios
    .post(`${API_URL}`, { email: email, password: password })
    .then((response) => {
      // TODO: 紀錄返回的 JWT
      window.location.href = 'articles.html'
    })
    .catch((error) => {
      const errorMsg = error.response.data.msg
      loginErrorMsg.textContent = errorMsg
    })
})
