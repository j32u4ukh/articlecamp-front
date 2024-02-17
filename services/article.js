const ArticleModel = require("../models/article");
const { ReturnCode, ErrorCode } = require("../utils/codes.js");

class ArticleService {
  add(args) {
    return new Promise((resolve, reject) => {
      ArticleModel.add({
        author: args.author,
        title: args.title,
        content: args.content,
      })
        .then((article) => {
          resolve(article);
        })
        .catch((err) => {
          reject({ ret: ReturnCode.ServerInternalError, err });
        });
    });
  }
  getArticles(filterFunc) {
    return new Promise((resolve, reject) => {
      let articles = ArticleModel.getAll();
      if (filterFunc) {
        articles = articles.filter((article) => {
          return filterFunc(article);
        });
      }
      resolve(articles);
    });
  }
  getByKeyword(keyword) {
    return new Promise((resolve, reject) => {
      keyword = keyword.toUpperCase();
      this.getArticles((article) => {
        if (article.author.toUpperCase().includes(keyword)) {
          return true;
        }
        if (article.title.toUpperCase().includes(keyword)) {
          return true;
        }
        if (article.content.toUpperCase().includes(keyword)) {
          return true;
        }
        return false;
      }).then((articles) => {
        resolve(articles);
      });
    });
  }
  get(args) {
    return new Promise((resolve, reject) => {
      const result = ArticleModel.get(args.id);
      if (result.index === -1) {
        reject({
          ret: ReturnCode.NotFound,
          err: {
            code: ErrorCode.ParamError,
            msg: `沒有 id 為 ${args.id} 的文章`,
          },
        });
      }
      resolve(result.data);
    });
  }
  update(args) {
    return new Promise((resolve, reject) => {
      ArticleModel.update(args.id, args.article)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject({ ret: ReturnCode.ServerInternalError, err });
        });
    });
  }
  delete(args) {
    return new Promise((resolve, reject) => {
      ArticleModel.delete(args.id)
        .then(() => {
          resolve({
            code: ErrorCode.Ok,
            msg: "OK",
          });
        })
        .catch((err) => {
          reject({ ret: ReturnCode.ServerInternalError, err });
        });
    });
  }
}

const Article = new ArticleService();
module.exports = Article;
