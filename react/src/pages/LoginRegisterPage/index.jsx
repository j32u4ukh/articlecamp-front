import { login, selectUser } from "../../store/slice/user.js";
import { selectPersist, setText } from "../../store/slice/persist.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LabeledInput from '../../components/LabeledInput';
import Styles from './styles.module.css';

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

    // 登入成功後前往 index 頁面
    function loginHandler() {
        console.log('Handle login')
        dispatch(login({ id: new Date().getTime(), name: 'King' }));
        dispatch(setText('pekomiko'))
        navigate('/articles');
    }

    // 註冊成功後前往 login 頁面
    function registerHandler() {
        console.log('Handle register')
        // dispatch(logout());
        navigate('/login');
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
            {isRegister && <LabeledInput type="text" id="name" className={Styles.input} text="名稱：" />}
            <LabeledInput type="text" id="email" className={Styles.input} text="信箱："/>
            <LabeledInput type="password" id="password" className={Styles.input} text="密碼：" />
            {isRegister && <LabeledInput type="password" id="confirm" className={Styles.input} text="確認密碼：" />}
            <button className={Styles.button} onClick={isRegister ? registerHandler : loginHandler}>{submit}</button>
            <div>
                {isRegister ? '已有帳號？ ' : '尚無帳號？ '}
                <span className={Styles.span} onClick={handleRedirect}>{redirect}</span>
            </div>
        </div>
    )
}