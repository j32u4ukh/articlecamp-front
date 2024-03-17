import { readFile, writeFile } from 'fs'

class Model {
  constructor({ file_path }) {
    this.FILE_PATH = file_path
  }
  // 根據 id 取得指定數據
  get({ id, datas, n_data }) {
    // TODO: use findIndex
    let data
    for (let i = 0; i < n_data; i++) {
      data = datas[i]
      if (data.id === id) {
        return { index: i, data: data }
      }
    }
    return { index: -1, data: null }
  }
  getList(datas, offset, size, func) {
    let tempDatas
    if (func) {
      tempDatas = datas.filter((data) => {
        return func(data)
      })
    } else {
      tempDatas = datas
    }
    const total = tempDatas.length
    if (offset > total) {
      offset = total
    }
    let len = offset + size
    len = len > total ? total : len
    const results = {
      total: Number(total),
      offset: Number(offset),
      size: Number(size),
      datas: tempDatas.slice(offset, len),
    }
    return results
  }
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
  }
  // 從檔案中讀取數據
  read() {
    return new Promise((resolve, reject) => {
      readFile(this.FILE_PATH, 'utf8', (err, data) => {
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
  }
  // 將數據寫入檔案中
  write(data) {
    return new Promise((resolve, reject) => {
      writeFile(this.FILE_PATH, JSON.stringify(data), 'utf8', (err) => {
        if (err) {
          reject(reject(`寫出數據失敗, err: ${err}`))
        } else {
          resolve(data)
        }
      })
    })
  }
}

export default Model
