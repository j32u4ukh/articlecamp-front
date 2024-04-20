import { login, selectUser } from "../../store/slice/user.js";
import { selectPersist, setText } from "../../store/slice/persist.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LabeledInput from '../../components/LabeledInput';
import Styles from './styles.module.css';
import axios from 'axios';
import { useRef } from 'react';
import { BASE_URL, COOKIE } from '../../utils'
const LOGIN_URL = `${BASE_URL}/login`
const REGISTER_URL = `${BASE_URL}/register`

export default function LoginRegisterPage(props) {
    const type = props.type.toLowerCase();
    console.log(`type: ${type}`)
    const usersState = useSelector(selectUser);
    const rootState = useSelector(selectPersist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRegister = type === 'register'
    console.log(`isLogined: ${usersState.isLogined}, user: ${JSON.stringify(usersState.user)}`);
    const text = rootState.text;
    console.log(`text: ${text}`)

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const repasswordRef = useRef(null);
    const messageRef = useRef(null);

    // 登入成功後前往 index 頁面
    function loginHandler() {
        // TODO: 在前端就判斷參數是否正確，如果不正確，就不要送出請求了
        console.log('Handle login')
        const email = emailRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        const message = messageRef.current
        message.textContent = ''
        axios
            .post(LOGIN_URL, { email, password })
            .then((response) => {
                const data = response.data
                const token = data.token
                console.log(token)
                // 紀錄返回的 JWT
                COOKIE.set('token', token)
                const parts = token.split('.')
                const payload = JSON.parse(atob(parts[1]))
                COOKIE.set('user', payload.user)
                dispatch(login({ id: new Date().getTime(), name: 'King' }));
                dispatch(setText('pekomiko'))
                navigate('/articles');
            })
            .catch((error) => {
                const errorMsg = error.response.data.msg
                message.textContent = errorMsg
            })
    }

    // 註冊成功後前往 login 頁面
    function registerHandler() {
        // TODO: 在前端就判斷參數是否正確，如果不正確，就不要送出請求了
        const name = nameRef.current.value.trim()
        const email = emailRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        const repassword = repasswordRef.current.value.trim()
        const message = messageRef.current
        message.textContent = ''

        // NOTE: 可以先檢查不同，然後就 return，用以簡化判斷(當有多個判斷，錯誤時不送出請求)，也避免多層判斷
        // 密碼 與 確認密碼 需相同
        if (password === repassword) {
            if (
                name &&
                email &&
                password &&
                repassword
            ) {
                axios
                    .post(REGISTER_URL, {
                        name,
                        email,
                        password,
                        repassword,
                    })
                    .then((response) => {
                        console.log(response.data)
                        console.log('Handle register')
                        // dispatch(logout());
                        navigate('/login');
                        emailRef.current.value = ''
                        passwordRef.current.value = ''
                    })
                    .catch((error) => {
                        const errorMsg = error.response.data.msg
                        message.textContent = errorMsg
                    })
            } else {
                message.textContent = '所有欄位都需填寫、不能為空白'
            }
        } else {
            message.textContent = '密碼需一致'
        }
    }

    // 跳轉至 login || register
    function handleRedirect() {
        console.log(`Redirect to ${isRegister ? "login" : "register"}`)
        navigate(`${isRegister ? "/login" : "/register"}`)
    }

    const title = isRegister ? "註冊帳號" : "登入會員"
    const submit = isRegister ? "註冊" : "登入"
    const redirect = isRegister ? "登入" : "註冊"

    return (
        <div className={Styles.container}>
            <h1>{title}</h1>
            <div ref={messageRef} className={Styles.message}></div>
            {isRegister && <div className={Styles.input}>
                <label className={Styles.label} htmlFor="name">名稱：</label>
                <input ref={nameRef} type="text" id="name" />
            </div>}

            <div className={Styles.input}>
                <label className={Styles.label} htmlFor="email">信箱：</label>
                <input ref={emailRef} type="text" id="email" />
            </div>

            <div className={Styles.input}>
                <label className={Styles.label} htmlFor="password">密碼：</label>
                <input ref={passwordRef} type="password" id="password" />
            </div>

            {isRegister && <div className={Styles.input}>
                <label className={Styles.label} htmlFor="confirm">確認密碼：</label>
                <input ref={repasswordRef} type="password" id="confirm" />
            </div>}

            <button className={Styles.button} onClick={isRegister ? registerHandler : loginHandler}>{submit}</button>
            <div>
                {isRegister ? '已有帳號？ ' : '尚無帳號？ '}
                <span className={Styles.span} onClick={handleRedirect}>{redirect}</span>
            </div>
        </div>
    )
}