const ArticleModel = require("../models/article");
const { ReturnCode, ErrorCode } = require("../utils/codes.js");

class ArticleService {
  getAll(res) {
    return res.send(ArticleModel.getAll());
  }
  add(res, args) {
    ArticleModel.add({
      author: args.author,
      title: args.title,
      content: args.content,
    })
      .then((article) => {
        return res.send(article);
      })
      .catch((err) => {
        console.log(`err: ${JSON.stringify(err)}`);
        return res.status(ReturnCode.ServerInternalError).json(err);
      });
  }
  get(res, args) {
    const result = ArticleModel.get(args.id);
    if (result.index === -1) {
      return res.status(ReturnCode.NotFound).json({
        code: ErrorCode.ParamError,
        msg: `沒有 id 為 ${id} 的文章`,
      });
    }
    return res.json(result.data);
  }
  update(res, args) {
    ArticleModel.update(args.id, args.article)
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        return res.status(ReturnCode.ServerInternalError).json(err);
      });
  }
  delete(res, args) {
    ArticleModel.delete(args.id)
      .then(() => {
        res.json({
          code: ErrorCode.Ok,
          msg: "OK",
        });
      })
      .catch((err) => {
        return res.status(ReturnCode.ServerInternalError).json(err);
      });
  }
}

const Article = new ArticleService();
module.exports = Article;
