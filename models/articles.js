const fs = require("fs");
const FILE_PATH = "./public/data/articles.json";
const { ErrorCode } = require("../utils/codes.js");

class ArticleModel {
  constructor() {
    this.articles = [];
    this.next_id = 0;
    this.n_article = 0;
    this.requiredFields = ["author", "title", "content"];

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
  // 新增文章
  // TODO: write()
  add(article) {
    return new Promise((resolve, reject) => {
      try {
        const isValid = this.validate(article);
        if (!isValid) {
          reject({
            code: ErrorCode.ParamError,
            msg: "缺少必要參數或內容為空白",
          });
        }
        article.id = this.next_id;
        const timestamp = this.getTimestamp();
        article.createAt = timestamp;
        article.updateAt = timestamp;
        this.articles.push(article);

        // 將文章列表寫入檔案中
        this.write()
          .then(() => {
            // 成功寫入，再更新索引值
            this.next_id++;
            this.n_article = this.articles.length;
            resolve(article);
          })
          .catch((err) => {
            if (this.articles.length !== this.n_article) {
              this.articles.pop();
            }
            reject(err);
          });
      } catch (error) {
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
  //取得所有文章
  getAll() {
    return this.articles;
  }
  // 根據文章 id 取得指定文章
  get(id) {
    let article;
    for (let i = 0; i < this.n_article; i++) {
      article = this.articles[i];
      if (article.id === id) {
        return { index: i, data: article };
      }
    }
    return { index: -1, data: null };
  }
  // 根據文章 id 取得指定文章
  update(id, article) {
    return new Promise((resolve, reject) => {
      const { index, data } = this.get(id);
      if (index === -1) {
        reject({
          code: ErrorCode.UpdateError,
          msg: `沒有 id 為 ${id} 的文章`,
        });
      } else {
        const isValid = this.validate(article);
        console.log(`isValid: ${isValid}`);
        if (!isValid) {
          reject({
            code: ErrorCode.ParamError,
            msg: "缺少必要參數或內容為空白",
          });
        }
        article.id = data.id;
        article.createAt = data.createAt;
        article.updateAt = this.getTimestamp();
        this.articles[index] = article;

        // 將文章列表寫入檔案中
        this.write()
          .then(() => {
            resolve(article);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
  // 將文章列表寫入檔案中
  write() {
    return new Promise((resolve, reject) => {
      fs.writeFile(FILE_PATH, JSON.stringify(this.articles), "utf8", (err) => {
        if (err) {
          reject({
            code: ErrorCode.WriteError,
            msg: "Failed to add an article",
          });
        }

        console.log("File written successfully");
        resolve();
      });
    });
  }
  //
  validate(data) {
    const keys = Object.keys(data);
    for (const field of this.requiredFields) {
      if (!keys.includes(field)) {
        return false;
      }
      if (data[field] === "") {
        return false;
      }
    }
    return true;
  }
  // 取得時間戳(毫秒)
  getTimestamp() {
    return Math.floor(new Date().getTime() / 1000);
  }
}

const Article = new ArticleModel();
module.exports = Article;
