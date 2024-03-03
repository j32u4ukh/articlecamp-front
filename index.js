const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

// 使用 cors 中間件
app.use(cors())

app.use(express.static('public'))
app.use(express.json())

// 引用路由器
const router = require('./routes')

// 將 request 導入路由器
app.use(router)

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
