module.exports = {
  // 取得時間戳(毫秒)
  getTimestamp() {
    return Math.floor(new Date().getTime() / 1000)
  },
}
