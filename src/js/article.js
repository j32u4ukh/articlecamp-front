function getCookies() {
  const datas = document.cookie.split(";");
  let cookies = {};
  const options = [];
  datas.forEach((data) => {
    if (data.includes("=")) {
      const [key, value] = data.split("=");
      if (key === "data") {
        cookies = JSON.parse(value);
      } else {
        options.push(data);
      }
    } else {
      options.push(data);
    }
  });
  return [cookies, options];
}

function getCookie(key) {
  const [cookies, _] = getCookies();
  return cookies[key];
}

function setCookie(key, value) {
  const [cookies, options] = getCookies();
  cookies[key] = value;
  options.push(`data=${JSON.stringify(cookies)}`);
  document.cookie = options.join(";");
}

const articleId = Number(getCookie("articleId"));
console.log(`articleId: ${articleId}`);



// GPT版本
// function getCookie(key) {
//   const cookies = document.cookie.split('; ')
//       .reduce((acc, cookie) => {
//           const [name, value] = cookie.split('=');
//           acc[name] = value;
//           return acc;
//       }, {});
//   return cookies[key];
// }

// function setCookie(key, value) {
//   document.cookie = `${key}=${value}`;
// }

// const articleId = Number(getCookie("articleId"));
// console.log(`articleId: ${articleId}`);






// 編輯文章按鈕
const editArticle = document.querySelector('#editButton')
editArticle.addEventListener('click', function (event) {
  console.log(event)
  window.location.href = "../html/edit.html"
})

//
// createArticle.addEventListener('click', function onCreateClicked(event) {
//   window.location.href = './create.html'
// }) 