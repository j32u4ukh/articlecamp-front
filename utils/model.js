const fs = require('fs')

module.exports = {
  // 取得時間戳(毫秒)
  getTimestamp() {
    return Math.floor(new Date().getTime() / 1000)
  },
  // 檢查傳入數據(data)是否必要欄位(requiredFields)都有定義，呼叫 Model 新增或更新數據前，須確保欄位都正確
  validate(data, requiredFields) {
    const keys = Object.keys(data)
    for (const field of requiredFields) {
      if (!keys.includes(field)) {
        return false
      }
      if (data[field] === '') {
        return false
      }
    }
    return true
  },
  // 從檔案中讀取數據
  read(file_path) {
    return new Promise((resolve, reject) => {
      fs.readFile(file_path, 'utf8', (err, data) => {
        if (err) {
          reject(`讀取數據失敗, err: ${err}`)
        }
        try {
          const results = JSON.parse(data)
          resolve(results)
        } catch (error) {
          reject(`解析 Json 格式數據時發生錯誤, error: ${error}`)
        }
      })
    })
  },
  // 將數據寫入檔案中
  write(file_path, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file_path, JSON.stringify(data), 'utf8', (err) => {
        if (err) {
          reject(reject(`寫出數據失敗, err: ${err}`))
        } else {
          resolve(data)
        }
      })
    })
  },
}
