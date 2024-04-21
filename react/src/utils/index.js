export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const VERSION = 2
const PORT = 5000
export const BASE_URL = `http://localhost:${PORT}/v${VERSION}`

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
export { COOKIE };