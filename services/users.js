import { User as UserModel } from '../models/index'
import { ErrorCode } from '../utils/codes.js'

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
  get({ id }) {
    return new Promise((resolve, reject) => {
      const result = UserModel.get(id)
      if (result.index === -1) {
        reject({
          code: ErrorCode.NotFound,
          msg: `沒有 id 為 ${id} 的用戶`,
        })
      }
      resolve(result.data)
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
}

const User = new UserService()
export default User
