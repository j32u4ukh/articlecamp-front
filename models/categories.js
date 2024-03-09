const Model = require('../utils/model')

class CategoryModel {
  constructor() {
    this.FILE_PATH = './public/data/v2/categories.json'
    this.categories = []

    // 讀取文章分類數據
    Model.read(this.FILE_PATH)
      .then((categories) => {
        this.categories.push(...categories)
      })
      .catch((err) => {
        console.error(err)
      })
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
}

const Category = new CategoryModel()
module.exports = Category
