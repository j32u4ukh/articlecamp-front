import { Category as Model } from '../models/index'

class CategoryService {
  getList(filterFunc) {
    return new Promise((resolve, reject) => {
      const categories = Model.getList(filterFunc)
      resolve(categories)
    })
  }
}

const Category = new CategoryService()
export default Category
