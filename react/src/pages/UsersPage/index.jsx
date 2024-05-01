import BasicLayout from "../../layouts/BasicLayout";
import PageStyles from "../page.module.css";
import FollowUserItem from "../../components/FollowUserItem";
import Styles from "./style.module.css";
import SearchBar from "../../components/SearchBar";

export default function UsersPage() {
    return (
        <BasicLayout>
            <div className={`${"container"}`}>
                <SearchBar />
                <div
                    className={`${"flex-column"} ${"text-center"} ${
                        PageStyles["d-flex"]
                    } ${"c-debug-red"}`}
                >
                    <FollowUserItem id={1} />
                    <FollowUserItem id={2} />
                    <FollowUserItem id={3} />
                    <FollowUserItem id={4} />
                    <FollowUserItem id={5} />
                    <FollowUserItem id={6} />
                </div>
            </div>
        </BasicLayout>
    );
}
