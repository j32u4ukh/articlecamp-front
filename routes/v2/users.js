const { Router } = require('express')
const { User } = require('../../services')
const router = Router()

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
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
