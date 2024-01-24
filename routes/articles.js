const express = require("express");
const router = express.Router();
const Article = require("../models/articles");
const { ReturnCode, ErrorCode } = require("../utils/codes.js");

router.get("/", (req, res) => {
  res.send(Article.getAll());
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
    author: author,
    title: title,
    content: req.body.content,
  })
    .then((article) => {
      res.send(article);
    })
    .catch((err) => {
      console.log(`err: ${JSON.stringify(err)}`);
      return res.status(ReturnCode.ServerInternalError).json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = Article.get(id);
  if (result.index === -1) {
    return res.status(ReturnCode.NotFound).json({
      code: ErrorCode.ParamError,
      msg: `沒有 id 為 ${id} 的文章`,
    });
  }
  return res.json(result.data);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const article = req.body;
  Article.update(id, article)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(ReturnCode.BadRequest).json(err);
    });
});

module.exports = router;
