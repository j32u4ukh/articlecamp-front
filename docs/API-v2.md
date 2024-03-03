# API v2

## 表格結構

### articls 文章
* number id: 文章 ID
* string author: 作者名稱
* string title: 標題
* string content: 內文
* number createAt: 生成時間戳(UTC+0)
* number updateAt: 更新時間戳(UTC+0)

### users 用戶
* number id: 用戶 ID
* string name: 用戶名稱
* string email: 用戶信箱
* string password: 用戶密碼
* array categories: 用戶文章前三主要分類(每次新增或更新文章時，同步更新此欄位)

### messages 留言
* number id: 留言 ID
* number user_id: 作者用戶 ID
* string message: 留言內文
* number createAt: 生成時間戳(UTC+0)

### follows 追隨關係
* number id: 追隨關係 ID
* number user_id: 用戶 ID
* number follow_id: 被追隨的用戶 ID

## API 方法與 url

* POST /v2/register
    * 註冊帳號，讀取名稱、信箱、密碼
    * 檢查信箱使否已存在，存在則拒絕註冊，不存在則將用戶數據寫入檔案。
    * Request 數據格式：
    ```
    {
        name: "Author Name",
        email: "This is title",
        password: "This is content",
    }
    ```
    * Response 數據格式：
    ```
    {
        msg: "OK",
    }
    ```

* POST /v2/login
    * 檢查信箱與密碼是否正確，正確則要求前端跳轉到文章列表頁，錯誤則拒絕登入。
    * 登入成功則返回用戶 id，並要求跳轉到 articles.html
    * Request 數據格式：
    ```
    {
        email: "This is title",
        password: "This is content",
    }
    ```
    * Response 數據格式：
    ```
    {
        id: 3,
        token: xxx,
    }

* GET /v2/images/:fileName
    * 供 <img src="/v2/images/:fileName"> 使用，因此無需自行發送請求或是處理回應

* POST /v2/images
    * 更新用戶圖片
    * Request 數據格式：[bytes array]
    * Request header: 使用登入時給的 token 作為辨識用戶的代碼
    ```
    token = xxx
    ```
    * Response 數據格式：
    ```
    {
        msg: "OK",
    }
    ```

* GET /v2/users/:id
    * 取得用戶資訊，包含用戶 ID、頭像圖片(圖片的 url)、用戶名稱、信箱。
    * Request header: 使用登入時給的 token 作為辨識用戶的代碼
    ```
    token = xxx
    ```
    * Response 數據格式：
    ```
    {
        id: 3,
        img: 圖片的 url,
        name: xxx,
        email: xxx@example.com
    }
    ```

* GET /v2/users
    * 取得用戶列表，優先回傳已追蹤用戶，再回傳未追蹤用戶。
    * 返回的用戶列表不應包含當前用戶
    * query 參數: 
        * offset(可選): 數據筆數偏移量，預設為 0。
        * size(可選): 返回數據筆數，預設為 10。
    * Request header: 使用登入時給的 token 作為辨識用戶的代碼
    ```
    token = xxx
    ```
    * Response 數據格式：
    ```
    {
        total: 137,
        users: [
            {
                id: 1
                name: xxx,
                img: 圖片的 url,
                categories: [
                    aaa,
                    bbb,
                    ccc
                ]
            },
            {
                id: 2
                name: xxx,
                img: 圖片的 url,
                categories: [
                    aaa,
                    bbb,
                    ccc
                ]
            },
        ]
    }
    ```

* POST /v2/users/follow
    * 更新追隨狀態(ON/OFF)
    * Request 數據格式：
    ```
    {
        user_id: 20,
        follow: true,
    }
    ```
    * Request header: 使用登入時給的 token 作為辨識用戶的代碼
    ```
    token = xxx
    ```
    * Response 數據格式：
    ```
    {
        msg: "OK",
    }
    ```

* GET /v2/articles
    * 返回文章列表
    * query 參數: 
        * offset(可選): 數據筆數偏移量，預設為 0。
        * size(可選): 返回數據筆數，預設為 10。
        * keyword(可選): 根據關鍵字來過濾文章列表 ex: /articles?keyword=xxx
    * Request header: 使用登入時給的 token 作為辨識用戶的代碼
    ```
    token = xxx
    ```
    * Response 數據格式：
    ```
    {
        total: 794,
        articles: [
            {
                id: 1,
                author: "Author Name",
                title: "This is title",
                createAt: 1705819929,
                updateAt: 1705819929,
            },
            {
                id: 2,
                author: "Author Name",
                title: "This is title2",
                createAt: 1705819929,
                updateAt: 1705819930,
            },
            ...
        ],
    }
    ```
* POST /v2/articles/create
    * 新增文章
    * Request 數據格式：
    ```
    {
        user_id: 4,
        title: "This is title",
        content: "This is content",
        category: 3,
    }
    ```
    * Request header: 使用登入時給的 token 作為辨識用戶的代碼
    ```
    token = xxx
    ```
    * Response 數據格式：
    ```
    {
        id: 3,
        author: "Author Name",
        title: "This is title3",
        content: "This is content3",
        updateAt: 1705840000,
    }
    ```
* GET /v2/articles/:id
    * 根據 id 返回單篇文章
    * Request header: 使用登入時給的 token 作為辨識用戶的代碼
    ```
    token = xxx
    ```
    * Response 數據格式：
    ```
    {
        user_id: 7,
        name: xxx,
        img: 圖片的 url,
        title: "This is title",
        content: "This is content",
        category: 2,
        messages: [
            {
                name: xxx,
                img: 圖片的 url,
                message: xxx,
                createAt: 12321,
            },
            {
                name: aaa,
                img: 圖片的 url,
                message: hello,
                createAt: 12327,
            },
        ]
    }
    ```
* PUT /v2/articles/:id
    * 根據 id 更新單篇文章
    * 可以部份更新
    * Request 數據格式：
    ```
    {
        content: "This is new content",
    }
    ```
    * Request header: 使用登入時給的 token 作為辨識用戶的代碼
    ```
    token = xxx
    ```
    * Response 數據格式：
    ```
    {
        id: 4,
        author: "Author Name",
        title: "This is title",
        content: "This is new content",
        updateAt: 1705840000,
    }
    ```
