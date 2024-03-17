import Model from './base'
import { getTimestamp } from '../utils'

class UserModel extends Model {
  constructor() {
    super({ file_path: `./public/data/v2/users.json` })
    this.users = []
    this.next_id = 0
    this.n_user = 0
    this.requiredFields = ['name', 'email', 'password']

    this.read()
      .then((users) => {
        users.forEach((user) => {
          this.next_id = this.next_id > user.id ? this.next_id : user.id
          this.users.push(user)
        })
        this.next_id++
        this.n_user = users.length
      })
      .catch((err) => {
        console.error(err)
      })
  }
  // 新增用戶
  add(user) {
    return new Promise((resolve, reject) => {
      user.id = this.next_id
      const timestamp = getTimestamp()
      user.createAt = timestamp
      user.updateAt = timestamp
      this.user.push(user)

      // 將用戶列表寫入檔案中
      this.write(this.users)
        .then((users) => {
          // 成功寫入，再更新索引值
          this.next_id++
          this.n_user = users.length
          resolve(user)
        })
        .catch((error) => {
          this.users.pop()
          reject(error)
        })
    })
  }
  // 根據用戶 id 取得指定用戶
  get(id) {
    return super.get({ id: id, datas: this.users, n_data: this.n_user })
  }
  getList(offset, size, func) {
    let users
    if (func) {
      users = this.users.filter((user) => {
        return func(user)
      })
    } else {
      users = this.users
    }
    const total = users.length
    if (offset > total) {
      offset = total
    }
    let len = offset + size
    len = len > total ? total : len
    const results = {
      total: Number(total),
      offset: Number(offset),
      size: Number(size),
      users: users.slice(offset, len),
    }
    return results
  }
  // 根據用戶 id 更新指定用戶
  update(index, user) {
    return new Promise((resolve, reject) => {
      user.updateAt = getTimestamp()
      this.users[index] = user

      // 將用戶列表寫入檔案中
      this.write(this.users)
        .then((users) => {
          resolve(users[index])
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const User = new UserModel()
export default User
