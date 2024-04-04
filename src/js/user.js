// const User = require('./UserModel')

const userListContainer = document.querySelector('.user-list-container')
const userContainer = document.querySelector('.user-container')
const userImage = document.querySelector('.user-image')
const userName = document.querySelector('.user-name')
const followBtn = document.querySelectorAll('.follow-btn')
const homeIcon = document.querySelector('.icon')
const USERLIST_URL = `${BASE_URL}/users`

    ; (function init() {
        homeIcon.addEventListener('click', (e) => {
            window.location.href = './index.html'
        })
        followBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const target = e.target
                if (target.matches('.follow-btn')) {
                    const btnId = target.id
                    const isfollowed = target.classList.toggle('followed')
                    target.textContent = isfollowed ? 'Followed' : 'Follow'
                    console.log(`ID:${btnId}`)
                }
            })
        })
    })()



const token = 2
document.addEventListener('DOMContentLoaded', function () {
    axios.get(USERLIST_URL, {
        headers: {
            token: token
        },
    })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

