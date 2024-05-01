import BasicLayout from "../../layouts/BasicLayout";
import PageStyles from "../page.module.css";
import FollowUserItem from "../../components/FollowUserItem";
import Styles from "./style.module.css";
import SearchBar from "../../components/SearchBar";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPersist } from "../../store/slice/persist";
import { BASE_URL } from '../../utils'
import axios from 'axios'

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([])
    const searchRef = useRef(null)

    const persist = useSelector(selectPersist)
    const token = persist.jwt

    useEffect(() => {
        axios
            .get(`${BASE_URL}/users`, { headers: { authorization: `Bearer ${token}` } })
            .then((response) => {
                console.log(response.data)
                setUsers(response.data.datas)
            })
    }, [])

    function onSearchBtnClick() {
        console.log(`search input: ${searchRef.current.value}`)
        // Fake data
        const fakeData = []
        let number = Number(searchRef.current.value)
        if (number === undefined || number === 0) {
            number = 10
        }
        for (let i = 0; i < number; i++) {
            fakeData.push({ id: i + 1 });
        }
        setUsers((prev) => [...prev, ...fakeData])

        console.log(`users: ${JSON.stringify(users)}`)
        // TODO: 送出取得用戶列表的請求

        // 重置搜尋欄
        searchRef.current.value = ""
    }

    const isFollowed = (userId) => {
        const user = users.find(user => user.id === userId);
        return user && user.status === 1
    }

    const toggleFollow = (userId) => {
        const user = users.find(user => user.id === userId);
        const follow = user && user.status === 1 ? false : true;

        axios
            .post(`${BASE_URL}/users`, { userId, follow }, { headers: { authorization: `Bearer ${token}` } })
            .then((response) => {
                // 更新追蹤用戶status
                setUsers(users.map(user => user.id === userId ? { ...user, status: follow ? 1 : 0 } : user))
            })
            .catch((error) => {
                console.error('Error toggling follow:', error)
            })
    }

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
                    className={`${"flex-column"} ${"text-center"} ${PageStyles["d-flex"]
                        } ${"c-debug-red"}`}
                >
                    {users.map((user) => {
                        return (
                            <FollowUserItem
                                key={user.id}
                                user={user}
                                isFollowed={isFollowed(user.id)}
                                onFollowToggle={toggleFollow}
                            />
                        )
                    })}
                </div>
            </div>
        </BasicLayout>
    )
}
