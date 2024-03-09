const CategoryModel = require('../models/categories')
const { ReturnCode, ErrorCode } = require('../utils/codes.js')

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
