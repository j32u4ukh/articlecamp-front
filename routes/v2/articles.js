const express = require('express')
const router = express.Router()
const { Article2 } = require('../../services/article.js')
const { ReturnCode, ErrorCode } = require('../../utils/codes.js')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  if (keyword) {
    Article2.getByKeyword({ keyword }).then((articles) => {
      res.json(articles)
    })
  } else {
    Article2.getList().then((articles) => {
      res.json(articles)
    })
  }
})

router.post('/create', (req, res) => {
  console.log(`create: ${JSON.stringify(req.body)}`)
  const author = req.body.author
  if (author === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.ParamError,
      msg: 'author 為必要參數',
    })
  }
  const title = req.body.title
  if (title === '') {
    return res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.ParamError,
      msg: 'title 為必要參數',
    })
  }
  Article2.add({
    author,
    title,
    content: req.body.content,
  })
    .then((result) => {
      res.json(result)
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err)
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
