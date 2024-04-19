import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPage(){
    const navigate = useNavigate();
    const params= useParams();
    const articleId = params.id;

    useEffect(()=>{
        // 檢查 id 是否為數字
        if (isNaN(Number(articleId))) {

            // 如果 id 不是數字，使用 history.replace() 重定向到 NotFoundPage
            navigate('/NotFound', { replace: true });
        }
    }, []);

    return (
        <>
            <h1>Edit Page # {articleId}</h1>
        </>
    );
}