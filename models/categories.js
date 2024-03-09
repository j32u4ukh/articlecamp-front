const fs = require('fs')

class CategoryModel {
  constructor() {
    this.FILE_PATH = './public/data/v2/categories.json'
    this.categories = []

    this.read()
      .then((categories) => {
        this.categories.push(...categories)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  // 取得所有文章
  getAll() {
    return this.categories
  }
  // 根據文章 id 取得指定文章
  get(id) {
    let category = this.categories.find((c) => c.id === id)
    if (category.length === 0) {
      return null
    }
    return category[0]
  }
  getList(func) {
    if (func) {
      return this.categories.filter((category) => {
        return func(category)
      })
    } else {
      return this.categories
    }
  }
  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.FILE_PATH, 'utf8', (err, data) => {
        if (err) {
          reject(`讀取數據失敗, err: ${err}`)
        }
        try {
          const categories = JSON.parse(data)
          resolve(categories)
        } catch (error) {
          reject(`解析 Json 格式數據時發生錯誤, error: ${error}`)
        }
      })
    })
  }
}

const Category = new CategoryModel()
module.exports = Category
