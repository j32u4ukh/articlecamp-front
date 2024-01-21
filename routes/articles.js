const express = require("express");
const router = express.Router();
const Article = require("../models/articles");
const { ReturnCode, ErrorCode } = require("../utils/codes.js");

router.get("/", async (req, res) => {
  Article.getArticles()
    .then((articles) => {
      res.send(articles);
    })
    .catch((err) => {
      console.log(`err: ${JSON.stringify(err)}`);
      return res.status(ReturnCode.ServerInternalError).json({
        code: ErrorCode.ReadError,
        msg: "Error reading file",
      });
    });
});

router.post("/create", async (req, res) => {});

module.exports = router;
