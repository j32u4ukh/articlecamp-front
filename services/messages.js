const { Message: Model } = require('../models/index')
const { ReturnCode, ErrorCode } = require('../utils/codes.js')

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
}

const Message = new MessageService()
module.exports = Message
