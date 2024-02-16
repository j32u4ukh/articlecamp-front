const express = require("express");
const router = express.Router();
const Article = require("../services/article");
const { ReturnCode, ErrorCode } = require("../utils/codes.js");

router.get("/", (req, res) => {
  res.json(Article.getAll());
});

router.post("/create", (req, res) => {
  console.log(`create: ${JSON.stringify(req.body)}`);
  const author = req.body.author;
  if (author === "") {
    res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.ParamError,
      msg: "author 為必要參數",
    });
  }
  const title = req.body.title;
  if (title === "") {
    res.status(ReturnCode.BadRequest).json({
      code: ErrorCode.ParamError,
      msg: "title 為必要參數",
    });
  }
  Article.add({
    author,
    title,
    content: req.body.content,
  })
    .then((result) => {
      res.json(result);
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err);
    });
});

router.get("/:id", (req, res) => {
  Article.get({
    id: Number(req.params.id),
  })
    .then((result) => {
      res.json(result);
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err);
    });
});

router.put("/:id", (req, res) => {
  Article.update({
    id: Number(req.params.id),
    article: req.body,
  })
    .then((result) => {
      res.json(result);
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Article.delete({
    id: Number(req.params.id),
  })
    .then((result) => {
      res.json(result);
    })
    .catch(({ ret, err }) => {
      res.status(ret).json(err);
    });
});

module.exports = router;
