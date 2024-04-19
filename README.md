# articlecamp-front

供使用者新增、修改以及閱讀文章的網站，可透過搜尋欄過濾自己需要的文章。

使用者之間可以互相追蹤，以讀取對方的文章。

> 由 [Alex](https://github.com/Alejandrocsdev), [Louis](https://github.com/Louis110112), [ShangRuey](https://github.com/ShangRuey), [Peggy](https://github.com/PeggyYou), j32u4ukh 進行開發

> 後端倉庫在 [這裡](https://github.com/j32u4ukh/articlecamp-back)。

## 頁面介紹

### 註冊頁面

透過不重複的 email 進行註冊，送出請求前會檢查各個欄位是否都有填入，以及兩次密碼輸入是否相同。

註冊成功後，會跳轉到登入頁面。

![註冊頁面](/repo/register.png)

### 登入頁面

使用 email 和密碼進行登入，成功登入後會返回 JWT 作為後續驗證用的 token，並跳轉到文章列表頁面。

![登入頁面](/repo/login.png)

### 文章列表頁面

呈現用戶自己以及追隨對象的文章，透過無限下滑機制，每次向後端請求 N 筆數據，動態渲染文章區塊。

點擊 READ 按鈕後，跳轉到單篇文章頁面。

![文章列表頁面](/repo/index.png)

### 單篇文章頁面

呈現單篇文章，以及其他用戶對這篇文章的留言。

![單篇文章頁面](/repo/article.png)

### 編輯文章頁面

可針對文章的標題、分類以及內文做再編輯。

![編輯文章頁面](/repo/edit.png)

### 新增文章頁面

新增文章時，標題和內文為必填，文章分類則為選填。

![新增文章頁面](/repo/create.png)

### 用戶個人頁面

可修改用戶的名稱、信箱以及用戶頭像圖片。

![用戶個人頁面](/repo/profile.png)

### 追隨頁面

列出其他用戶的列表，透過右方的追隨按鈕，切換追隨或取消追隨。

![追隨頁面](/repo/users.png)