// 引用 Express 與 Express 路由器
import { Router } from 'express'
const router = Router()

// 準備引入路由模組
import articles from './articles'
router.use('/articles', articles)

// 匯出路由器
export default router
