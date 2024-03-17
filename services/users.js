const { User: UserModel } = require('../models/index')
const { ErrorCode } = require('../utils/codes')
const multer = require('multer')
const { getImageFolder, toBase62 } = require('../utils/index')
const upload = multer({ dest: 'public/images/' })
const fs = require('fs')
const path = require('path')

class UserService {
  getList(userId, offset, size, filterFunc) {
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
      const users = UserModel.getList(userId, offset, size, filterFunc)
      resolve(users)
    })
  }
  get({ id, concealing = true }) {
    return new Promise((resolve, reject) => {
      let { index, data } = UserModel.get(id)
      if (index === -1) {
        reject({
          code: ErrorCode.NotFound,
          msg: `沒有 id 為 ${id} 的用戶`,
        })
      }
      if (concealing) {
        delete data.password
        delete data.createAt
      }
      resolve(data)
    })
  }
  add(user) {
    return new Promise((resolve, reject) => {
      const isValid = UserModel.validate(user, UserModel.requiredFields)
      if (!isValid) {
        reject({
          code: ErrorCode.MissingParameters,
          msg: `缺少必要參數, requiredFields: ${JSON.stringify(
            UserModel.requiredFields
          )}`,
        })
        return
      }
      UserModel.add(user)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          console.error(error)
          reject({
            code: ErrorCode.WriteError,
            msg: '寫入數據時發生錯誤',
          })
        })
    })
  }
  // 根據 id 更新用戶數據
  update({ id, user }) {
    return new Promise((resolve, reject) => {
      const { index, data } = UserModel.get(id)
      if (index === -1) {
        reject({
          code: ErrorCode.NotFound,
          msg: `沒有 id 為 ${id} 的用戶`,
        })
        return
      }
      const isValid = UserModel.validate(user, UserModel.requiredFields)
      if (!isValid) {
        reject({
          code: ErrorCode.MissingParameters,
          msg: `缺少必要參數, requiredFields: ${JSON.stringify(
            UserModel.requiredFields
          )}`,
        })
        return
      }
      user.id = id
      user.createAt = data.createAt
      UserModel.update(index, user)
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

  // 經過 upload.single() 這個 middleware 後，檔案的部分就會被放到 req.file 屬性裡，而其他非檔案的欄位仍然會保留在 req.body 屬性裡
  uploadImage(image) {
    return new Promise((resolve, reject) => {
      // 從檔案路徑讀檔
      fs.readFile(image, (err, data) => {
        if (err) {
          console.error(err)
          return reject({
            code: ErrorCode.ReadError,
            msg: '讀取檔案時發生錯誤',
          })
        }

        const timestamp = Date.now()
        const prefix = Math.floor(Math.random() * 10000)
          .toString()
          .padEnd(5, '0')
        const suffix = Math.floor(Math.random() * 10000)
          .toString()
          .padStart(5, '0')
        const fileName = `${toBase62(`${prefix}${timestamp}${suffix}`)}.png`
        const filePath = path.join(getImageFolder(), fileName)
        fs.writeFile(filePath, data, () => {
          // 檔案寫入成功後，刪除暫時的檔案
          fs.unlink(image, (err) => {
            if (err) {
              console.error(err)
            }

            // 文件删除成功
            resolve(fileName)
          })
        })
      })
    })
  }
}

const User = new UserService()
module.exports = { User, upload }
