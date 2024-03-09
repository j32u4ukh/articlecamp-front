const Model = require('./base')
const { ErrorCode } = require('../utils/codes.js')

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
      const timestamp = this.getTimestamp()
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
  // 取得所有留言
  getAll() {
    return this.messages
  }
  getList(offset, size, func) {
    return super.getList(this.messages, offset, size, func)
  }
  // 根據留言 id 刪除留言
  delete(id) {
    return new Promise((resolve, reject) => {
      const { index, _ } = this.get({
        id: id,
        datas: this.messages,
        n_data: this.n_messages,
      })
      if (index === -1) {
        reject({
          code: ErrorCode.DeleteError,
          msg: `沒有 id 為 ${id} 的留言`,
        })
        return
      }

      // 根據索引值移除留言
      this.messages.splice(index, 1)

      // 將留言列表寫入檔案中
      this.write(this.messages)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const Message = new MessageModel()
module.exports = Message
