const userListContainer = document.querySelector('.user-list-container')
const USERLIST_URL = `${BASE_URL}/users`
const IMAGE_URL = `${BASE_URL}/users/images`
// NOTE: 不要在程式碼中途宣告變數，一律在最上方進行宣告
// 從cookie取得token
const token = COOKIE.get('token')
const userDatas = []

function renderUserList(datas) {
  let rawHTML = ''
  datas.forEach((data) => {
    console.log(`data: ${JSON.stringify(data)}`)
    let buttonText = 'Follow'
    let buttonClass = 'follow-btn'

    if (data.status) {
      buttonText = 'Followed'
      buttonClass = 'followed'
    }

    rawHTML += `<div class="user-container">
                <div class="user-image">
                    <img src="${BASE_URL}/users/images/${data.id}/${data.image}" alt="">
                </div>
                <div class="user-name">${data.name}</div>
                <button class="${buttonClass}" data-id="${data.id}" data-follow="${data.followed}">${buttonText}</button>
            </div>`
  })
  userListContainer.innerHTML = rawHTML
}

;(function init() {
  // NOTE: 監聽器要設置在"上層容器"，每個按鈕都設置監聽器會影響效能
  userListContainer.addEventListener(
    'click',
    function onFollowButtonClicked(e) {
      const target = e.target
      const btnId = target.dataset.id

      if (target.matches('.follow-btn') || target.matches('.followed')) {
        let currentStatu = target.dataset.follow === 'true' ? true : false
        const newStatu = !currentStatu
        console.log(currentStatu)
        console.log(newStatu)
        axios
          .post(
            USERLIST_URL,
            {
              userId: btnId,
              follow: newStatu,
            },
            { headers: { authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            target.dataset.follow = newStatu.toString()
            target.textContent = newStatu ? 'Followed' : 'Follow'
            target.classList = newStatu ? 'followed' : 'follow-btn'
            console.log(res)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  )

  // NOTE: 初始化、設置監聽器相關的內容寫在 init() 來進行管理
  document.addEventListener('DOMContentLoaded', function () {
    axios
      .get(USERLIST_URL, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response)
        const datas = response.data.datas
        userDatas.push(...datas)
        console.log(userDatas)
        renderUserList(userDatas)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })

  renderHeader()
})()
