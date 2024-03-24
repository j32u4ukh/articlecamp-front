// 引用 Express 與 Express 路由器
const Router = require('express')
// 準備引入路由模組
const articles = require('./articles')
const users = require('./users')

// 建立根路由
const router = Router()

// API-v2
const v2 = Router()
v2.use('/articles', articles)
v2.use('/users', users)

// 將 API-v2 相關路由加入根路由
router.use('/v2', v2)

// 匯出路由器
module.exports = router
