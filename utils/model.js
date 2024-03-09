const fs = require('fs')

module.exports = {
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
          resolve()
        }
      })
    })
  },
}
