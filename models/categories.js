const Model = require('../utils/model')

class CategoryModel {
  constructor() {
    this.FILE_PATH = './public/data/v2/categories.json'
    this.categories = []
    this.n_category = 0

    // 讀取文章分類數據
    Model.read(this.FILE_PATH)
      .then((categories) => {
        this.categories.push(...categories)
        this.n_category = categories.length
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
  getName(id) {
    let category
    for (let i = 0; i < this.n_category; i++) {
      category = this.categories[i]
      if (category.id === id) {
        return category.name
      }
    }
    return null
  }
  // 有效文章分類 id 則直接返回，否則返回預設文章分類 id
  validCategory(categoryId) {
    return this.isValidCategory(categoryId) ? categoryId : 1
  }
  // 判斷文章分類 id 是否有效
  isValidCategory(categoryId) {
    if (categoryId === undefined || categoryId === '') {
      return false
    }
    for (let i = 0; i < this.n_category; i++) {
      if (this.categories[i].id === categoryId) {
        return true
      }
    }
    return false
  }
}

const Category = new CategoryModel()
module.exports = Category
