const path = require('path')

module.exports = {
  getTimestamp() {
    return Math.floor(new Date().getTime() / 1000)
  },
  getImageFolder() {
    const root = path.resolve(__dirname, '..')
    return path.join(root, 'public/images')
  },
  getRoot() {
    return path.resolve(__dirname, '..')
  },
}
