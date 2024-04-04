const API_URL = `${BASE_URL}/register`

const registerSubmit = document.querySelector('#registerSubmit')
const registerErrorMsg = document.querySelector('#registerErrorMsg')

registerSubmit.addEventListener('click', (event) => {
  event.preventDefault()
  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const repassword = document.getElementById('repassword').value
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
