module.exports = {
  // 取得時間戳(毫秒)
  getTimestamp() {
    return Math.floor(new Date().getTime() / 1000)
  },
  toNumeric(str) {
    if (str === null || str === '' || isNaN(str)) {
      return [NaN, false]
    }
    const val = Number(str)
    return [val, !isNaN(val)]
  },
}
