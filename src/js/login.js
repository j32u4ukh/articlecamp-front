const API_URL = `${BASE_URL}/login`
const loginSubmit = document.querySelector('#loginSubmit')
const loginErrorMsg = document.querySelector('#loginErrorMsg')

//登入submit 監聽器
loginSubmit.addEventListener('click', (event) => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  axios
    .post(`${API_URL}`, { email: email, password: password })
    .then((response) => {
      loginErrorMsg.textContent = ''
      /*window.location.href = 'articles.html'*/
      console.log('登入成功')
    })
    .catch((error) => {
      const errorMsg = error.response.data.msg
      loginErrorMsg.textContent = errorMsg
    })
})
