const Model = require('./base')
const Utils = require('../utils')

function belongToArticle(articleId, message) {
  return message.articleId === articleId
}

class MessageModel extends Model {
  constructor() {
    super({ file_path: './public/data/v2/messages.json' })
    this.messages = []
    this.next_id = 0
    this.n_message = 0
    this.requiredFields = ['articleId', 'content']

    this.read()
      .then((messages) => {
        messages.forEach((message) => {
          this.next_id = this.next_id > message.id ? this.next_id : message.id
          this.messages.push(message)
        })
        this.next_id++
        this.n_message = messages.length
      })
      .catch((err) => {
        console.error(err)
      })
  }
  // 新增留言
  add(message) {
    return new Promise((resolve, reject) => {
      message.id = this.next_id
      const timestamp = Utils.getTimestamp()
      message.createAt = timestamp
      this.messages.push(message)
      // 將文章列表寫入檔案中
      this.write(this.messages)
        .then((messages) => {
          // 成功寫入，再更新索引值
          this.next_id++
          this.n_message = messages.length
          resolve(message)
        })
        .catch((error) => {
          this.messages.pop()
          reject(error)
        })
    })
  }
  get(id) {
    return super.get({ id, datas: this.messages, n_data: this.n_message })
  }
  // 取得留言列表
  getList(articleId, offset, size, func) {
    let filterFunc
    if (func) {
      filterFunc = (message) => {
        return belongToArticle(articleId, message) && func(message)
      }
    } else {
      filterFunc = (message) => {
        return belongToArticle(articleId, message)
      }
    }
    return super.getList(this.messages, offset, size, filterFunc)
  }
  // 檢查傳入數據(data)是否必要欄位(requiredFields)都有定義
  validate(data) {
    return super.validate(data, this.requiredFields)
  }
}

const Message = new MessageModel()
module.exports = Message
