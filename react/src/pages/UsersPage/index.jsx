import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FollowUserItem from "../../components/FollowUserItem";
import SearchBar from "../../components/SearchBar";
import BasicLayout from "../../layouts/BasicLayout";
import { selectPersist } from "../../store/slice/persist";
import { BASE_URL } from "../../utils";
import Styles from "./style.module.css";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const searchRef = useRef(null);
    const persist = useSelector(selectPersist);
    const token = persist.jwt;

    useEffect(() => {
        axios
            .get(`${BASE_URL}/users`, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response.data);
                setUsers(response.data.datas);
            });
    }, []);

    function onSearchBtnClick() {
        console.log(`search input: ${searchRef.current.value}`);
        const value = searchRef.current.value.trim();
        const search = value ? `?search=${value}` : "";
        console.log(`search: ${search}`);

        axios
            .get(`${BASE_URL}/users${search}`, {
                headers: { authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response.data);
                setUsers(response.data.datas);
            });

        console.log(`users: ${JSON.stringify(users)}`);

        // 重置搜尋欄文字
        searchRef.current.value = "";
    }

    const toggleFollow = (userId) => {
        const user = users.find((user) => user.id === userId);
        if (user) {
            const follow = user.status === 0;

            axios
                .post(
                    `${BASE_URL}/users`,
                    { userId, follow },
                    { headers: { authorization: `Bearer ${token}` } },
                )
                .then((response) => {
                    // 更新追蹤用戶 status
                    setUsers(
                        users.map((user) =>
                            user.id === userId
                                ? { ...user, status: follow ? 1 : 0 }
                                : user,
                        ),
                    );
                })
                .catch((error) => {
                    console.error("Error toggling follow:", error);
                });
        }
    };

    return (
        <BasicLayout>
            <div className={`${"container"}`}>
                <SearchBar
                    className={Styles["search-bar"]}
                    placeholder="Search..."
                    ref={searchRef}
                    onClick={onSearchBtnClick}
                />
                <div
                    className={`${"flex-column"} ${"text-center"} ${"d-flex"}`}
                >
                    {users.map((user) => {
                        return (
                            <FollowUserItem
                                key={user.id}
                                user={user}
                                onFollowToggle={toggleFollow}
                            />
                        );
                    })}
                </div>
            </div>
        </BasicLayout>
    );
}
