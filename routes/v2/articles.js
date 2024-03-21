const { Router } = require('express')
const router = Router()
const { Article2, Category, Message } = require('../../services')
const { ReturnCode, ErrorCode } = require('../../utils/codes')

router.get('/', (req, res) => {
  const token = req.headers.token
  if (token === undefined) {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: '缺少必要參數 token',
    })
  }
  // 暫時使用 userId 作為 token
  const userId = token
  const keyword = req.query.keyword
  const offset = req.query.offset
  const size = req.query.size
  const summary = true
  if (keyword) {
    Article2.getByKeyword2(userId, offset, size, summary, keyword).then(
      (articles) => {
        res.json(articles)
      }
    )
  } else {
    Article2.getList2(userId, offset, size, summary).then((articles) => {
      res.json(articles)
    })
  }
})

router.post('/create', (req, res) => {
  const token = req.headers.token
  if (token === undefined) {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: '缺少必要參數 token',
    })
  }
  // 暫時使用 userId 作為 token
  const userId = token
  const BODY = req.body
  const title = BODY.title
  if (title === undefined || title === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.ParamError,
      msg: 'title 為必要參數',
    })
  }
  Article2.add({
    userId,
    title,
    category: BODY.category,
    content: BODY.content,
  })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

router.get('/categories', (req, res) => {
  Category.getList().then((categories) => {
    res.json(categories)
  })
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  Article2.get({
    id,
  })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

router.get('/:id/messages', (req, res) => {
  const articleId = Number(req.params.id)
  const offset = req.query.offset
  const size = req.query.size
  Message.getList(articleId, offset, size).then((result) => {
    res.json(result)
  })
})

router.post('/:id/messages', (req, res) => {
  const articleId = Number(req.params.id)
  const BODY = req.body
  if (BODY.content === undefined || BODY.content === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.MissingParameters,
      msg: 'content 為必要參數',
    })
  }

  // TODO: 從 header 取得用戶 ID
  const userId = 1
  Message.add(userId, articleId, BODY)
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  Article2.update({
    id,
    article: req.body,
  })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      res.status(ErrorCode.getReturnCode(error.code)).json(error)
    })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  Article2.delete({
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
