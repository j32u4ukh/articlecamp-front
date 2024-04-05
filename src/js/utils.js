const VERSION = 2
const PORT = 3000
const BASE_URL = `http://localhost:${PORT}/v${VERSION}`

class Cookie {
  constructor(options) {
    this.options = options
    // let initData = `c-data=${JSON.stringify({})}`
    // options.unshift(initData)
    // document.cookie = options.join('; ')
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

// function getCookies() {
//   const datas = document.cookie.split(';')
//   let cookies = {}
//   const options = []
//   datas.forEach((data) => {
//     if (data.includes('=')) {
//       const [key, value] = data.split('=')
//       if (key === 'data') {
//         cookies = JSON.parse(value)
//       } else {
//         options.push(data)
//       }
//     } else {
//       options.push(data)
//     }
//   })
//   return [cookies, options]
// }

// // 根據 key 取得 cookie 的內容
// function getCookie(key) {
//   const [cookies, _] = getCookies()
//   return cookies[key]
// }

// function setCookie(key, value) {
//   const [cookies, options] = getCookies()
//   cookies[key] = value
//   options.unshift(`data=${JSON.stringify(cookies)}`)
//   document.cookie = options.join(';')
// }

// // 初始化 cookie 的數據結構
// function initCookies() {
//   const initData = `data=${JSON.stringify({})}`
//   if (document.cookie === '') {
//     // 若您的應用程式需要這組 Cookie 才能在不同環境中運作，請加上「SameSite=None」屬性。
//     document.cookie = `${initData}; SameSite=None; Secure`
//   } else {
//     const [_, options] = getCookies()
//     options.unshift(initData)
//     document.cookie = options.join(';')
//   }
// }

// function getQueryParam(key) {
//   const url = new URL(window.location.href)
//   const value = url.searchParams.get(key)
//   return value
// }
