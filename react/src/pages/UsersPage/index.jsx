import BasicLayout from "../../layouts/BasicLayout";
import PageStyles from "../page.module.css";
import FollowUserItem from "../../components/FollowUserItem";
import Styles from "./style.module.css";
import SearchBar from "../../components/SearchBar";
import { useRef } from "react";
import { useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const searchRef = useRef(null);

    function onSearchBtnClick() {
        console.log(`search input: ${searchRef.current.value}`);
        // Fake data
        const fakeData = [];
        let number = Number(searchRef.current.value);
        if (number === undefined || number === 0) {
            number = 10;
        }
        for (let i = 0; i < number; i++) {
            fakeData.push({ id: i + 1 });
        }
        setUsers((prev) => [...prev, ...fakeData]);

        console.log(`users: ${JSON.stringify(users)}`);
        // TODO: 送出取得用戶列表的請求

        // 重置搜尋欄
        searchRef.current.value = "";
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
                    className={`${"flex-column"} ${"text-center"} ${
                        PageStyles["d-flex"]
                    } ${"c-debug-red"}`}
                >
                    {users.map((user) => {
                        return <FollowUserItem id={user.id} key={user.id} />;
                    })}
                </div>
            </div>
        </BasicLayout>
    );
}
