const path = require('path')
const baseX = require('base-x')

// 創建 BASE62 編碼器
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const textEncoder = new TextEncoder()
const base62Encoder = baseX(BASE62)

module.exports = {
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
  getImageFolder() {
    const root = path.resolve(__dirname, '..')
    return path.join(root, 'public/images')
  },
  getRoot() {
    return path.resolve(__dirname, '..')
  },
  toBase62(data) {
    data = textEncoder.encode(data)
    return base62Encoder.encode(data)
  },
  selectByOffsetSize(datas, offset = 0, size = 10) {
    try {
      offset = Number(offset)
      size = Number(size)
    } catch {
      offset = 0
      size = 10
    }
    const total = datas.length
    if (offset > total) {
      offset = total
    }
    let len = offset + size
    len = len > total ? total : len
    const results = {
      total: Number(total),
      offset: Number(offset),
      size: Number(len - offset),
      datas: datas.slice(offset, len),
    }
    return results
  },
}
