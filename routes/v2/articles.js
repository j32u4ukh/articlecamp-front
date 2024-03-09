const express = require('express')
const router = express.Router()
const { Article2, Category, Message } = require('../../services')
const { ReturnCode, ErrorCode } = require('../../utils/codes.js')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const offset = req.query.offset
  const size = req.query.size
  const summary = true
  if (keyword) {
    Article2.getByKeyword2(offset, size, summary, keyword).then((articles) => {
      res.json(articles)
    })
  } else {
    Article2.getList2(offset, size, summary).then((articles) => {
      res.json(articles)
    })
  }
})

router.post('/create', (req, res) => {
  const BODY = req.body
  const author = BODY.author
  if (author === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.ParamError,
      msg: 'author 為必要參數',
    })
  }
  const title = BODY.title
  if (title === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.ParamError,
      msg: 'title 為必要參數',
    })
  }
  Article2.add({
    author,
    title,
    category: BODY.category,
    content: BODY.content,
  })
    .then((result) => {
      res.json(result)
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err)
    })
})

router.get('/categories', (req, res) => {
  Category.getList().then((categories) => {
    res.json(categories)
  })
})

router.get('/:id', (req, res) => {
  Article2.get({
    id: Number(req.params.id),
  })
    .then((result) => {
      res.json(result)
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err)
    })
})

router.get('/:id/messages', (req, res) => {
  const offset = req.query.offset
  const size = req.query.size
  Message.getList(Number(req.params.id), offset, size)
    .then((result) => {
      res.json(result)
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err)
    })
})

router.put('/:id', (req, res) => {
  Article2.update({
    id: Number(req.params.id),
    article: req.body,
  })
    .then((result) => {
      res.json(result)
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err)
    })
})

router.delete('/:id', (req, res) => {
  Article2.delete({
    id: Number(req.params.id),
  })
    .then((result) => {
      res.json(result)
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err)
    })
})

module.exports = router
