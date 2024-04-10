import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from '../utils';


export default function CreateEditPage(props){
    const type = capitalizeFirstLetter(props.type);
    const isEdit = type === 'Edit';
    const [content, setContent] = useState(isEdit ? 'Hello world' : '');
    const params= useParams();
    const navigate = useNavigate();

    function onChangeHandler(e){
        setContent(e.target.value)
    }

    if(isEdit){
        useEffect(()=>{
            // 檢查 id 是否為數字
            if (isNaN(Number(params.id))) {

                // 如果 id 不是數字，使用 history.replace() 重定向到 NotFoundPage
                navigate('/NotFound', { replace: true });
            }
        }, []);
    }
    
    return (
        <div>
            <h1>{type} Page {isEdit && `#${params.id}`}</h1>
            <div>
                <label htmlFor="content">
                    Content: <input type="text" id="content" value={content}
                    onChange={onChangeHandler}/>
                </label>  
            </div> 
        </div>
    );
}