const { Article1, Article2 } = require('../models/article')
const { ReturnCode, ErrorCode } = require('../utils/codes.js')

class ArticleService {
  constructor(version) {
    this.version = version
    this.model = version === 1 ? Article1 : Article2
  }
  add(article) {
    return new Promise((resolve, reject) => {
      this.model
        .add(article)
        .then((article) => {
          resolve(article)
        })
        .catch((err) => {
          reject({ ret: ReturnCode.ServerInternalError, err })
        })
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
      this.model
        .update(id, article)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject({ ret: ReturnCode.ServerInternalError, err })
        })
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
