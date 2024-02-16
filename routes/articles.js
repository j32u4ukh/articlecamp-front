const express = require("express");
const router = express.Router();
const Article = require("../services/article");
const { ReturnCode, ErrorCode } = require("../utils/codes.js");

router.get("/", (req, res) => {
  return Article.getAll(res);
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
  Article.add(res, {
    author,
    title,
    content: req.body.content,
  });
});

router.get("/:id", (req, res) => {
  return Article.get(res, { id: Number(req.params.id) });
});

router.put("/:id", (req, res) => {
  Article.update(res, {
    id: Number(req.params.id),
    article: req.body,
  });
});

router.delete("/:id", (req, res) => {
  Article.delete(res, { id: Number(req.params.id) });
});

module.exports = router;
