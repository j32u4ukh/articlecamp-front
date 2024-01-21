const fs = require("fs");
const FILE_PATH = "./public/data/articles.json";

class ArticleModel {
  getArticles() {
    return new Promise((resolve, reject) => {
      fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }
        const result = JSON.parse(data);
        // console.log(`#data: ${result.length}`);
        resolve(result);
      });
    });
  }
}

const Article = new ArticleModel();
module.exports = Article;
