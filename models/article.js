const fs = require('fs')
const { ErrorCode } = require('../utils/codes.js')

class ArticleModel {
  constructor({ version }) {
    this.version = version
    this.FILE_PATH = `./public/data/v${version}/articles.json`
    this.articles = []
    this.next_id = 0
    this.n_article = 0

    // TODO: 根據 version 不同，設置不同的必要欄位
    this.requiredFields = ['author', 'title', 'content']

    this.read()
      .then((articles) => {
        this.articles.push(...articles)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  // 新增文章
  add(article) {
    return new Promise((resolve, reject) => {
      try {
        const isValid = this.validate(article)
        if (!isValid) {
          reject({
            code: ErrorCode.ParamError,
            msg: '缺少必要參數或內容為空白',
          })
        }
        article.id = this.next_id
        const timestamp = this.getTimestamp()
        article.createAt = timestamp
        article.updateAt = timestamp
        this.articles.push(article)

        // 將文章列表寫入檔案中
        this.write()
          .then(() => {
            // 成功寫入，再更新索引值
            this.next_id++
            this.n_article = this.articles.length
            resolve(article)
          })
          .catch((err) => {
            if (this.articles.length !== this.n_article) {
              this.articles.pop()
            }
            reject(err)
          })
      } catch (error) {
        if (this.articles.length !== this.n_article) {
          this.articles.pop()
        }
        reject({
          code: ErrorCode.ParamError,
          msg: 'Failed to add an article',
        })
      }
    })
  }
  // 取得所有文章
  getAll() {
    return this.articles
  }
  // 根據文章 id 取得指定文章
  get(id) {
    let article
    for (let i = 0; i < this.n_article; i++) {
      article = this.articles[i]
      if (article.id === id) {
        return { index: i, data: article }
      }
    }
    return { index: -1, data: null }
  }
  getList(func) {
    if (func) {
      return this.articles.filter((article) => {
        return func(article)
      })
    } else {
      return this.articles
    }
  }
  // 根據文章 id 更新指定文章
  update(id, article) {
    return new Promise((resolve, reject) => {
      const { index, data } = this.get(id)
      if (index === -1) {
        reject({
          code: ErrorCode.UpdateError,
          msg: `沒有 id 為 ${id} 的文章`,
        })
      } else {
        const isValid = this.validate(article)
        console.log(`isValid: ${isValid}`)
        if (!isValid) {
          reject({
            code: ErrorCode.ParamError,
            msg: '缺少必要參數或內容為空白',
          })
        }
        article.id = data.id
        article.createAt = data.createAt
        article.updateAt = this.getTimestamp()
        this.articles[index] = article

        // 將文章列表寫入檔案中
        this.write()
          .then(() => {
            resolve(article)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  }
  // 根據文章 id 刪除文章
  delete(id) {
    return new Promise((resolve, reject) => {
      const { index, _ } = this.get(id)
      if (index === -1) {
        reject({
          code: ErrorCode.UpdateError,
          msg: `沒有 id 為 ${id} 的文章`,
        })
        return
      }

      // 根據索引值移除文章
      this.articles.splice(index, 1)

      // 將文章列表寫入檔案中
      this.write()
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.FILE_PATH, 'utf8', (err, data) => {
        if (err) {
          reject(`讀取數據失敗, err: ${err}`)
        }
        const results = JSON.parse(data)
        const articles = []
        results.forEach((result) => {
          this.next_id = this.next_id > result.id ? this.next_id : result.id
          articles.push(result)
        })
        this.next_id++
        this.n_article = results.length
        // console.log(`next_id: ${this.next_id}`);
        resolve(articles)
      })
    })
  }
  // 將文章列表寫入檔案中
  write() {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.FILE_PATH,
        JSON.stringify(this.articles),
        'utf8',
        (err) => {
          if (err) {
            reject({
              code: ErrorCode.WriteError,
              msg: 'Failed to add an article',
            })
          }
          console.log('File written successfully')
          this.n_article = this.articles.length
          resolve()
        }
      )
    })
  }
  // 檢查是否必要欄位都有定義
  validate(data) {
    const keys = Object.keys(data)
    for (const field of this.requiredFields) {
      if (!keys.includes(field)) {
        return false
      }
      if (data[field] === '') {
        return false
      }
    }
    return true
  }
  // 取得時間戳(毫秒)
  getTimestamp() {
    return Math.floor(new Date().getTime() / 1000)
  }
}

const Article1 = new ArticleModel({ version: 1 })
const Article2 = new ArticleModel({ version: 2 })
module.exports = { Article1, Article2 }
