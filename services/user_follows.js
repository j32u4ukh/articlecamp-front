const Follow = require('./follows')
const { User } = require('./users')
const { selectByOffsetSize } = require('../utils')

class UserFollowService {
  getListWithFollow(userId, offset, size) {
    const users = User.getAll().filter((user) => user.id !== userId)
    const relationship = Follow.getList(userId)
    // 根據追隨關係，進行排序後，再考慮 offset 和 size
    const len = relationship.length
    let relation, index
    for (let i = 0; i < len; i++) {
      relation = relationship[i]
      index = users.findIndex((user) => user.id === relation.followTo)
      if (index !== -1) {
        users[index].followed = true
      }
    }
    users.sort((a, b) => {
      if (a.followed === undefined && b.followed === undefined) {
        return 0
      } else if (a.followed && b.followed === undefined) {
        return -1
      } else if (a.followed === undefined && b.followed) {
        return 1
      } else {
        return 0
      }
    })
    const results = selectByOffsetSize(users, offset, size)
    return results
  }
}

const UserFollow = new UserFollowService()
module.exports = UserFollow
