const express = require("express");
const router = express.Router();
const Article = require("../models/articles");

router.get("/", async (req, res) => {
  Article.getArticles()
    .then((articles) => {
      res.send(articles);
    })
    .catch((err) => {
      console.log(`err: ${JSON.stringify(err)}`);
      return res.status(500).json({
        msg: "Error reading file",
      });
    });
});

module.exports = router;
