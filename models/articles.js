const fs = require("fs");
const FILE_PATH = "./public/data/articles.json";
const { ErrorCode } = require("../utils/codes.js");

class ArticleModel {
  constructor() {
    this.articles = [];
    this.next_id = 0;
    this.n_article = 0;

    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) {
        console.log(`讀取數據失敗, err: ${err}`);
        return;
      }
      const results = JSON.parse(data);
      results.forEach((result) => {
        this.next_id = this.next_id > result.id ? this.next_id : result.id;
        this.articles.push(result);
      });
      this.next_id++;
      this.n_article = results.length;
      // console.log(`next_id: ${this.next_id}`);
    });
  }
  getAll() {
    return this.articles;
  }
  get(id) {
    return this.articles.find((article) => article.id === id);
  }
  add(article) {
    return new Promise((resolve, reject) => {
      try {
        article.id = this.next_id++;
        const timestamp = this.getTimestamp();
        article.createAt = timestamp;
        article.updateAt = timestamp;
        this.articles.push(article);

        // 將新的文章寫入檔案中
        fs.writeFile(
          FILE_PATH,
          JSON.stringify(this.articles),
          "utf8",
          (err) => {
            if (err) {
              reject({
                code: ErrorCode.WriteError,
                msg: "Failed to add an article",
              });
            }

            console.log("File written successfully");
            resolve(article);
          }
        );
      } catch (error) {
        this.next_id--;
        if (this.articles.length !== this.n_article) {
          this.articles.pop();
        }
        reject({
          code: ErrorCode.ParamError,
          msg: "Failed to add an article",
        });
      }
    });
  }
  getTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
  }
}

const Article = new ArticleModel();
module.exports = Article;
