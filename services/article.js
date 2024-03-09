const Model = require('../utils/model.js')
const { Article1, Article2, Category } = require('../models')
const { ReturnCode, ErrorCode } = require('../utils/codes.js')

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
      const isValid = Model.validate(article, this.model.requiredFields)
      if (!isValid) {
        reject({
          ret: BadRequest,
          err: '缺少必要參數',
        })
      } else {
        this.model
          .add(article)
          .then((article) => {
            resolve(article)
          })
          .catch((err) => {
            reject({ ret: ReturnCode.ServerInternalError, err })
          })
      }
    })
  }
  getList(filterFunc) {
    return new Promise((resolve, reject) => {
      const articles = this.model.getList(filterFunc)
      resolve(articles)
    })
  }
  getByKeyword({ keyword }) {
    return new Promise((resolve, reject) => {
      keyword = keyword.toUpperCase()
      // NOTE: 搜尋字如果要搜文章分類，必須是完整名稱，不區分大小寫
      // 根據搜尋字反查文章分類 id，再比對各篇文章的分類 id，而非將各篇文章的分類 id 轉換成字串來比對
      let cid = Category.getId(keyword)
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
        if (cid !== null && article.category === cid) {
          return true
        }
        return false
      }).then((articles) => {
        resolve(articles)
      })
    })
  }
  get({ id }) {
    return new Promise((resolve, reject) => {
      const result = this.model.get(id)
      if (result.index === -1) {
        reject({
          ret: ReturnCode.NotFound,
          err: {
            code: ErrorCode.ParamError,
            msg: `沒有 id 為 ${id} 的文章`,
          },
        })
      }
      resolve(result.data)
    })
  }
  update({ id, article }) {
    return new Promise((resolve, reject) => {
      const isValid = Model.validate(article, Article2.requiredFields)
      if (!isValid) {
        reject({
          ret: BadRequest,
          err: '缺少必要參數',
        })
      } else {
        this.model
          .update(id, article)
          .then((result) => {
            resolve(result)
          })
          .catch((err) => {
            reject({ ret: ReturnCode.ServerInternalError, err })
          })
      }
    })
  }
  delete({ id }) {
    return new Promise((resolve, reject) => {
      this.model
        .delete(id)
        .then(() => {
          resolve({
            code: ErrorCode.Ok,
            msg: 'OK',
          })
        })
        .catch((err) => {
          reject({ ret: ReturnCode.ServerInternalError, err })
        })
    })
  }
}

const Service1 = new ArticleService(1)
const Service2 = new ArticleService(2)
module.exports = { Article1: Service1, Article2: Service2 }
