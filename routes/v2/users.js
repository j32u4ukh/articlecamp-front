const { Router } = require('express')
const { User } = require('../../services')
const router = Router()
const { ReturnCode, ErrorCode } = require('../../utils/codes')
const { getRoot, getImageFolder } = require('../../utils')
const fs = require('fs')
const path = require('path')

router.get('/images/:fileName', (req, res) => {
  const imageFolder = getImageFolder()
  const fileName = req.params.fileName
  const filePath = path.join(imageFolder, fileName)

  // 檢查檔案是否存在
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // 返回 404 圖片
      res.sendFile(path.join(imageFolder, 'icons8-not-found-100.png'))
    } else {
      // 發送圖片文件
      res.sendFile(filePath)
    }
  })
})

router.get('/:id', (req, res) => {
  const token = req.headers.token
  if (token === undefined) {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: '缺少必要參數 token',
    })
  }
  const id = req.params.id
  if (token !== id) {
    return res.status(ReturnCode.Unauthorized).json({
      code: ErrorCode.Unauthorized,
      msg: `當前用戶沒有權限取得用戶 ${id} 的個人資料`,
    })
  }
  User.get({
    id,
  })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

module.exports = router
