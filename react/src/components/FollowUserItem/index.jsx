import Styles from "./styles.module.css";
import { BASE_URL } from "../../utils";

export default function FollowUserItem(props) {
    const user = props.user;
    const image = `${BASE_URL}/users/images/${user.id}/${user.image}`;

    return (
        <div className={Styles.container}>
            <div className={Styles.data}>
                <img
                    className={Styles.userImage}
                    src={image}
                    alt={`${user.name}`}
                />
                <div className={Styles.name}>{user.name}</div>
            </div>
            <button
                className={Styles.statusBtn}
                onClick={() => props.onFollowToggle(user.id)}
            >
                {user.status === 0 ? "Unfollow" : "Follow"}
            </button>
        </div>
    );
}
