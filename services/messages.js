const { Message: Model } = require('../models/index')
const { ErrorCode } = require('../utils/codes.js')

class MessageService {
  getList(articleId, offset, size, filterFunc) {
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
      const messages = Model.getList(articleId, offset, size, filterFunc)
      resolve(messages)
    })
  }
  get({ id }) {
    return new Promise((resolve, reject) => {
      const result = Model.get(id)
      if (result.index === -1) {
        reject({
          code: ErrorCode.NotFound,
          msg: `沒有 id 為 ${id} 的留言`,
        })
      }
      resolve(result.data)
    })
  }
  add(articleId, message) {
    return new Promise((resolve, reject) => {
      message.articleId = articleId
      const isValid = Model.validate(message)
      if (!isValid) {
        reject({
          code: ErrorCode.MissingParameters,
          msg: '缺少必要參數',
        })
        return
      }
      Model.add(message)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject({
            code: ErrorCode.WriteError,
            msg: error,
          })
        })
    })
  }
}

const Message = new MessageService()
module.exports = Message
