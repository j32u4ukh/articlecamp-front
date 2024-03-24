const { Article: ArticleModel, Category } = require('../models')
const Follow = require('./follows.js')
const { ErrorCode } = require('../utils/codes.js')

class ArticleService {
  add(article) {
    return new Promise((resolve, reject) => {
      article.category = Category.validCategory(article.category)
      const isValid = ArticleModel.validate(article)
      if (!isValid) {
        reject({
          code: ErrorCode.MissingParameters,
          msg: `缺少必要參數, requiredFields: ${JSON.stringify(
            ArticleModel.requiredFields
          )}`,
        })
      } else {
        ArticleModel.add(article)
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
  getList2(userId, offset, size, summary, filterFunc) {
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
      // TODO: 取得用戶 ID 以及其追蹤對象的 ID 列表
      const ids = [Number(userId)]
      const follows = Follow.getList(userId)
      follows.forEach((follow) => {
        ids.push(follow.followTo)
      })

      // 根據 ID 列表返回文章列表
      const articles = ArticleModel.getList((article) => {
        if (filterFunc) {
          let cond = filterFunc(article)
          if (cond === false) {
            return false
          }
        }
        return (
          ids.findIndex((id) => {
            return id == article.userId
          }) !== -1
        )
      })

      // 將數據重組的流程移到 service
      const total = articles.length
      if (offset > total) {
        offset = total
      }
      let len = offset + size
      len = len > total ? total : len
      const results = {
        total: Number(total),
        offset: Number(offset),
        size: Number(len - offset),
        articles: articles.slice(offset, len),
      }
      if (summary) {
        let article
        len = results.articles.length
        for (let i = 0; i < len; i++) {
          article = results.articles[i]
          let preview = article.content.substring(0, 20)
          if (article.content.length > 20) {
            preview += '...'
          }
          results.articles[i] = {
            id: article.id,
            userId: article.userId,
            title: article.title,
            category: article.category,
            content: preview,
            updateAt: article.updateAt,
          }
        }
      }
      resolve(results)
    })
  }
  getByKeyword(keyword) {
    return new Promise((resolve, reject) => {
      keyword = keyword.toUpperCase()
      this.getList((article) => {
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
  // TODO: 由於文章數據改存 userId，而非作者名稱，因此針對作者名稱的搜尋目前沒有實作，之後可以直接查完用戶名稱後，添加到文章數據當中
  getByKeyword2(userId, offset, size, summary, keyword) {
    return new Promise((resolve, reject) => {
      keyword = keyword.toUpperCase()
      // NOTE: 搜尋字如果要搜文章分類，必須是完整名稱，不區分大小寫
      // 根據搜尋字反查文章分類 id，再比對各篇文章的分類 id，而非將各篇文章的分類 id 轉換成字串來比對
      let cid = Category.getId(keyword)
      this.getList2(userId, offset, size, summary, (article) => {
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
      const result = ArticleModel.get(id)
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
      article.category = Category.validCategory(article.category)
      const isValid = ArticleModel.validate(article)
      if (!isValid) {
        reject({
          code: ErrorCode.MissingParameters,
          msg: '缺少必要參數',
        })
        return
      }
      const { index, data } = ArticleModel.get(id)
      if (index === -1) {
        reject({
          code: ErrorCode.NotFound,
          msg: `沒有 id 為 ${id} 的文章`,
        })
        return
      }
      article.id = id
      article.createAt = data.createAt
      ArticleModel.update(index, article)
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
      const { index, _ } = ArticleModel.get(id)
      if (index === -1) {
        reject({
          code: ErrorCode.NotFound,
          msg: `沒有 id 為 ${id} 的文章`,
        })
        return
      }
      ArticleModel.delete(id)
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

const Article = new ArticleService()
module.exports = Article
