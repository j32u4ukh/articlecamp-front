const userListContainer = document.querySelector('.user-list-container')
const userContainer = document.querySelector('.user-container')
const userImage = document.querySelector('.user-image')
const userName = document.querySelector('.user-name')
const followBtn = document.querySelector('.follow-btn')

const API_URL = `${BASE_URL}/users/:3`

userContainer.addEventListener('click', (e) => {
    const target = e.target
    console.log(e)
    if (target === followBtn) {
        let isfollowed = followBtn.classList.toggle('followed')
        followBtn.textContent = isfollowed ? 'Followed' : 'Follow'
        console.log(isfollowed)
    }
})


// document.addEventListener('DOMContentLoaded', function () {
//     axios.get(API_URL)
//         .then((res) => {

//             console.log(res)
//         })
//         .catch((err) => {
//             console.error(err)
//         })
// })