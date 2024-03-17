const { Router } = require('express')
const { User } = require('../../services')
const router = Router()
const { ReturnCode, ErrorCode } = require('../../utils/codes')

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
