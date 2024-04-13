import { Outlet } from "react-router-dom";
import BasicLayout from "./BasicLayout";

export default function ArticleLayout(){
    return (
        <BasicLayout>
            <Outlet/>
        </BasicLayout>
    )
}