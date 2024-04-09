const userListContainer = document.querySelector('.user-list-container')
const homeIcon = document.querySelector('.icon')
const USERLIST_URL = `${BASE_URL}/users`
const IMAGE_URL = `${BASE_URL}/users/images`
console.log(USERLIST_URL)
// GET / v2 / users / images /: userId /: fileName。
// 供 <img src="/v2/images/:userId/:fileName"> 使用，
// http://localhost:3000/v2/users

// NOTE: 不要在程式碼中途宣告變數，一律在最上方進行宣告
const token = 2
const userDatas = []

  ; (function init() {
    homeIcon.addEventListener('click', (e) => {
      window.location.href = './index.html'
    })

    //     POST / v2 / users

    //     更新追隨狀態(ON / OFF)
    // Request 數據格式：
    //     {
    //       targetId: 20,
    //         follow: true,
    // }


    // NOTE: 監聽器要設置在"上層容器"，每個按鈕都設置監聽器會影響效能
    userListContainer.addEventListener('click',
      function onFollowButtonClicked(e) {
        const target = e.target
        if (target.matches('.follow-btn')) {
          axios.post(USERLIST_URL, {
            userId: 3,
            follow: true,
          }, { headers: { token: 5 } }).then((res) => {
            console.log(res)
          }).catch((err) => {
            console.error(err)
          })
          const btnId = target.id
          const isfollowed = target.classList.toggle('followed')
          target.textContent = isfollowed ? 'Followed' : 'Follow'
          console.log(`ID: ${btnId}`)
        }
      }
    )


    // NOTE: 初始化、設置監聽器相關的內容寫在 init() 來進行管理
    document.addEventListener('DOMContentLoaded', function () {
      axios
        .get(USERLIST_URL, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          console.log(res)
          const datas = res.data.datas
          userDatas.push(...(datas))
          console.log(userDatas)
          renderUserList(userDatas)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    })
  })()

function renderUserList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `<div class="user-container">
                <div class="user-image">
                    <img src="http://localhost:3000/v2/users/images/${item.id}/${item.image}" alt="" ">
                </div>
                <div class="user-name">${item.name}</div>
                <button class="follow-btn" id="${item.id}">Follow</button>
            </div>`
    userListContainer.innerHTML = rawHTML
  })
}

const userId = 1
const fileName = 'icons8-h-100.png'
// axios.get(`${IMAGE_URL}/${userId}/${fileName}`, {
//   // responseType: 'arraybuffer'
// })
//   .then((res) => {
//     console.log(res)
//     // const blob = new Blob([res.data], { type: 'image/png' });
//     // imageDATA = URL.createObjectURL(blob);
//     const img = document.createElement('img')
//     img.src = `/v2/images/${userId}/${fileName}`
//     document.body.appendChild(img)
//   }).catch((err) => {
//     console.error(err)
//   })