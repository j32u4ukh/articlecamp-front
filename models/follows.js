import Model from './base'

class FollowModel extends Model {
  constructor() {
    super({ file_path: `./public/data/v2/follows.json` })
    this.follows = []
    this.next_id = 0
    this.n_follow = 0
    this.requiredFields = ['userId', 'followTo']

    this.read()
      .then((follows) => {
        follows.forEach((follow) => {
          this.next_id = this.next_id > follow.id ? this.next_id : follow.id
          this.follows.push(follow)
        })
        this.next_id++
        this.n_follow = follows.length
      })
      .catch((err) => {
        console.error(err)
      })
  }
  // 新增追隨關係
  add(follow) {
    return new Promise((resolve, reject) => {
      follow.id = this.next_id
      this.follows.push(follow)

      // 將追隨關係列表寫入檔案中
      this.write(this.follows)
        .then((follows) => {
          // 成功寫入，再更新索引值
          this.next_id++
          this.n_follow = follows.length
          resolve(follow)
        })
        .catch((error) => {
          this.follows.pop()
          reject(error)
        })
    })
  }
  // 取得所有追隨關係
  getAll() {
    return this.follows
  }
  // 根據追隨關係 id 取得指定追隨關係
  get(id) {
    return super.get({ id: id, datas: this.follows, n_data: this.n_follow })
  }
  getList(userId) {
    const results = this.follows.filter((follow) => {
      return follow.userId === userId
    })
    return results
  }
  checkRelationship(userId, targetId) {
    const index = this.follows.findIndex((follow) => {
      return follow.userId === userId && follow.followTo === targetId
    })
    return index !== -1
  }
  // 根據追隨關係 id 刪除追隨關係
  delete(index) {
    return new Promise((resolve, reject) => {
      // 根據索引值移除追隨關係
      this.follows.splice(index, 1)

      // 將追隨關係列表寫入檔案中
      this.write(this.follows)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const Follow = new FollowModel()
export default Follow
