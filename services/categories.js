const CategoryModel = require('../models/categories')

class CategoryService {
  getList(filterFunc) {
    return new Promise((resolve, reject) => {
      const categories = CategoryModel.getList(filterFunc)
      resolve(categories)
    })
  }
}

const Category = new CategoryService()
module.exports = Category
