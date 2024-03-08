const VERSION = 2
const PORT = 3000
const BASE_URL = `http://localhost:${PORT}/v${VERSION}`

// 取得 cookie 的完整資料結構
function getCookies() {
  const datas = document.cookie.split(';')
  let cookies = {}
  const options = []
  datas.forEach((data) => {
    if (data.includes('=')) {
      const [key, value] = data.split('=')
      if (key === 'data') {
        cookies = JSON.parse(value)
      } else {
        options.push(data)
      }
    } else {
      options.push(data)
    }
  })
  return [cookies, options]
}

// 根據 key 取得 cookie 的內容
function getCookie(key) {
  const [cookies, _] = getCookies()
  return cookies[key]
}

// 根據 key, value 設置 cookie 的內容
function setCookie(key, value) {
  const [cookies, options] = getCookies()
  cookies[key] = value
  options.unshift(`data=${JSON.stringify(cookies)}`)
  document.cookie = options.join(';')
}

// 初始化 cookie 的數據結構
function initCookies() {
  const initData = `data=${JSON.stringify({})}`
  if (document.cookie === '') {
    // 若您的應用程式需要這組 Cookie 才能在不同環境中運作，請加上「SameSite=None」屬性。
    document.cookie = `${initData};SameSite=None;secure`
  } else {
    const [_, options] = getCookies()
    options.unshift(initData)
    document.cookie = options.join(';')
  }
}

function getQueryParam(key) {
  const url = new URL(window.location.href)
  const value = url.searchParams.get(key)
  return value
}
