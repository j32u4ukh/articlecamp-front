
import Styles from './Header.module.css';

export default function Header(){
    return (
        <header>
            <nav style={{backgroundColor: '#DAF7A6', width: '100vw', height: '10vh'}}>
                <div className={Styles.logo}>
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
                        <a href="user.html"><i className="fa-solid fa-users fa-2xl"></i></a>
                    </div>
                    {/* Profile */}
                    <div className={Styles.profile}>
                        <a href="profile.html"><img src="../data/Alex.png" /></a>
                    </div>
                </div>
            </nav>
        </header>
    );
}