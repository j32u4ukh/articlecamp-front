import { useSelector } from "react-redux";
import { selectUser } from "../store/slice/user";

export default function ArticleListPage(){
    // useSelector：拿取 store 的 state，傳入在 slice 建立的 selectUser
    const states = useSelector(selectUser);
    console.log(`isLogined: ${states.isLogined}, user: ${JSON.stringify(states.user)}`);

    return (
        <>
            <h1>ArticleList Page</h1>
        </>
    );
}