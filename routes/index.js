// 引用 Express 與 Express 路由器
import { Router } from 'express'
const router = Router()

// API-v1
import v1 from './v1'
router.use('/v1', v1)

// API-v2
import v2 from './v2'
router.use('/v2', v2)

// 匯出路由器
export default router
