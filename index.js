const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

// 引用路由器
const router = require("./routes");

// app.engine(".hbs", engine({ extname: ".hbs" }));
// app.set("view engine", ".hbs");
// app.set("views", "./views");
app.use(express.static("public"));

// 將 request 導入路由器
app.use(router);

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
