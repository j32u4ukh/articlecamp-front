
import Styles from "../styles/Header.module.css";
import ComponentStyles from "../styles/Component.module.css"
import { useNavigate } from "react-router-dom";

export default function Header(){    
    const navigate = useNavigate();
    function onLogoClicked(){
        navigate("/articles");
    }
    return (
        <header id={Styles.header}>
            <nav id={Styles.nav}>
                <div id={Styles.logo} className={ComponentStyles.clickable} onClick={onLogoClicked}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        {/* 圓圈 */}
                        <circle cx="50" cy="50" r="40" fill="#c32f27" />
                        {/* 文字 "A" */}
                        <text
                        x="50"
                        y="57"
                        fontFamily="Arial"
                        fontSize="50"
                        fill="#f9c80e"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        >
                        A
                        </text>
                    </svg>
                </div>
                <div className={Styles.icons}>
                    {/* UserList */}
                    <div className={Styles.userList}>
                        <a href="./users">
                            <i className="fa-solid fa-users fa-2xl"></i>
                        </a>
                    </div>
                    {/* Profile */}
                    <div className={Styles.profile}>
                        <a href="./profile"><img src="/vite.svg" /></a>
                    </div>
                </div>
            </nav>
        </header>
    );
}