const { Article1, Article2, Category } = require('../models')
const { ErrorCode } = require('../utils/codes.js')

class ArticleService {
  constructor(version) {
    this.version = version
    this.model = version === 1 ? Article1 : Article2
  }
  add(article) {
    return new Promise((resolve, reject) => {
      // 版本 2 才考慮文章分類欄位
      if (this.version === 2) {
        article.category = Category.validCategory(article.category)
      }
      const isValid = this.model.validate(article, this.model.requiredFields)
      if (!isValid) {
        reject({
          code: ErrorCode.MissingParameters,
          msg: `缺少必要參數, requiredFields: ${JSON.stringify(
            this.model.requiredFields
          )}`,
        })
      } else {
        this.model
          .add(article)
          .then((article) => {
            resolve(article)
          })
          .catch((err) => {
            console.error(err)
            reject({
              code: ErrorCode.WriteError,
              msg: '寫入數據時發生錯誤',
            })
          })
      }
    })
  }
  getList(filterFunc) {
    return new Promise((resolve, reject) => {
      resolve(Article1.getList(filterFunc))
    })
  }
  getList2(offset, size, summary, filterFunc) {
    return new Promise((resolve, reject) => {
      if (offset === undefined || offset === '') {
        offset = 0
      } else {
        try {
          offset = Number(offset)
        } catch {
          offset = 0
        }
      }
      if (size === undefined || size === '') {
        size = 10
      } else {
        try {
          size = Number(size)
        } catch {
          size = 10
        }
      }
      const articles = Article2.getList2(offset, size, summary, filterFunc)
      resolve(articles)
    })
  }
  getByKeyword(keyword) {
    return new Promise((resolve, reject) => {
      keyword = keyword.toUpperCase()
      this.getList((article) => {
        if (article.author.toUpperCase().includes(keyword)) {
          return true
        }
        if (article.title.toUpperCase().includes(keyword)) {
          return true
        }
        if (article.content.toUpperCase().includes(keyword)) {
          return true
        }
        return false
      }).then((articles) => {
        resolve(articles)
      })
    })
  }
  getByKeyword2(offset, size, summary, keyword) {
    return new Promise((resolve, reject) => {
      keyword = keyword.toUpperCase()
      // NOTE: 搜尋字如果要搜文章分類，必須是完整名稱，不區分大小寫
      // 根據搜尋字反查文章分類 id，再比對各篇文章的分類 id，而非將各篇文章的分類 id 轉換成字串來比對
      let cid = Category.getId(keyword)
      this.getList2(offset, size, summary, (article) => {
        if (article.author.toUpperCase().includes(keyword)) {
          return true
        }
        if (article.title.toUpperCase().includes(keyword)) {
          return true
        }
        if (article.content.toUpperCase().includes(keyword)) {
          return true
        }
        if (cid !== null && article.category === cid) {
          return true
        }
        return false
      }).then((results) => {
        resolve(results)
      })
    })
  }
  get({ id }) {
    return new Promise((resolve, reject) => {
      const result = this.model.get(id)
      if (result.index === -1) {
        reject({
          code: ErrorCode.NotFound,
          msg: `沒有 id 為 ${id} 的文章`,
        })
        return
      }
      resolve(result.data)
    })
  }
  update({ id, article }) {
    return new Promise((resolve, reject) => {
      // 版本 2 才考慮文章分類欄位
      if (this.version === 2) {
        article.category = Category.validCategory(article.category)
      }
      const isValid = this.model.validate(article, this.model.requiredFields)
      if (!isValid) {
        reject({
          code: ErrorCode.MissingParameters,
          msg: '缺少必要參數',
        })
        return
      }
      const { index, data } = this.model.get(id)
      if (index === -1) {
        reject({
          code: ErrorCode.NotFound,
          msg: `沒有 id 為 ${id} 的文章`,
        })
        return
      }
      article.id = id
      article.createAt = data.createAt
      this.model
        .update(index, article)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          console.error(err)
          reject({
            code: ErrorCode.UpdateError,
            msg: '更新數據時發生錯誤',
          })
        })
    })
  }
  delete({ id }) {
    return new Promise((resolve, reject) => {
      const { index, _ } = this.model.get(id)
      if (index === -1) {
        reject({
          code: ErrorCode.NotFound,
          msg: `沒有 id 為 ${id} 的文章`,
        })
        return
      }
      this.model
        .delete(id)
        .then(() => {
          resolve({
            code: ErrorCode.Ok,
            msg: 'OK',
          })
        })
        .catch((err) => {
          console.error(err)
          reject({
            code: ErrorCode.DeleteError,
            msg: '刪除數據時發生錯誤',
          })
        })
    })
  }
}

const Service1 = new ArticleService(1)
const Service2 = new ArticleService(2)
module.exports = { Article1: Service1, Article2: Service2 }
