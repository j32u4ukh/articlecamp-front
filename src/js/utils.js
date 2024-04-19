const VERSION = 2
const PORT = 5000
const BASE_URL = `http://localhost:${PORT}/v${VERSION}`

class Cookie {
  constructor(options) {
    this.options = options
  }
  // 根據 key, value 設置 cookie 的內容
  set(key, value) {
    const cookies = this._get()
    cookies[key] = value
    const options = [`data=${JSON.stringify(cookies)}`]
    this.options.forEach((option) => {
      options.push(option)
    })
    document.cookie = options.join('; ')
  }
  // 根據 key 取得 cookie 的內容
  get(key) {
    const cookies = this._get()
    return cookies[key]
  }
  // 取得 cookie 的完整資料結構
  _get() {
    const datas = document.cookie.split(';')
    const len = datas.length
    let data
    for (let i = 0; i < len; i++) {
      data = datas[i].trim()
      const [k, v] = data.split('=')
      if (k === 'data') {
        return JSON.parse(v)
      }
    }
    return {}
  }
}

const COOKIE = new Cookie(['SameSite=None', 'Secure'])

// 統一渲染 Header
function renderHeader() {
  const root = document.querySelector('header')
  const user = COOKIE.get('user')
  root.innerHTML = `<nav class="nav-bar">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <!-- 圓圈 -->
          <circle cx="50" cy="50" r="40" fill="#c32f27" />
          <!-- 文字 "A" -->
          <text
            x="50"
            y="57"
            font-family="Arial"
            font-size="50"
            fill="#f9c80e"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            A
          </text>
        </svg>
      </div>

      <div class="list-profile-container">
        <!-- UserList -->
        <div class="user-list">
          <a href="user.html"><i class="fa-solid fa-users fa-2xl"></i></a>
        </div>
        <!-- Profile -->
        <div class="profile-picture">
          <a href="profile.html"><img src="${BASE_URL}/users/images/${user.id}/${user.image}" /></a>
        </div>
      </div>
    </nav>`

  const homeIcon = document.querySelector('.icon')

  homeIcon.addEventListener('click', (e) => {
    window.location.href = './index.html'
  })
}
