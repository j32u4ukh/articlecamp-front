import BasicLayout from '../../layouts/BasicLayout';
import Styles from "./styles.module.css";
import PageStyles from "../page.module.css";
import LabeledInput from "../../components/LabeledInput";
import { useSelector } from "react-redux";
import { selectPersist } from "../../store";
import { useState } from 'react';

export default function ProfilePage(){
    const rootState = useSelector(selectPersist);
    const user = rootState.user ?? {};
    console.log(`user: ${JSON.stringify(user)}`)
    const [name, setName] = useState(user.name ?? "");
    const [image, setImage] = useState(user.image ?? "");
    // nameRef.current = user.name
    // imageRef.current = user.image
    console.log(`user.name: ${user.name}, user.image: ${user.image}`)
    console.log(`name: ${name}, image: ${image}`)

    function onNameChanged(e){
        setName(e.target.value)
    }

    return (
        <BasicLayout>
            <div className={`${PageStyles.container}`}>
                <div className={Styles.articleContent}>
                    <label id="user-id" className={Styles.profileField}>User ID: {user.id ?? ""}</label><br />
                    {/* <label id="user-name">User Name:<input type="text"/></label> */}
                    <LabeledInput id="user-name" type="text" text="User Name:" value={name} className={Styles.profileField} onChange={onNameChanged}/>
                    {/* <br /> */}
                    <label id="email" className={Styles.profileField}>Email:  {user.email ?? ""}</label><br />
                    
                    <label htmlFor="file-upload" style={{cursor: "pointer"}}>
                    <input id="file-upload" type="file" name="image" style={{display: "none"}} accept="image/*" />
                    </label>
                    <button id="upload-btn">上傳圖片</button><br />
                    <img 
                        id={Styles.profileImage}
                        src="https://plus.unsplash.com/premium_photo-1669248390922-1a7999ec82a5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="user profile image"
                    />
                </div>
                <div className={PageStyles.applyBtns}>
                    <button id="cancel-btn">Cancel</button>
                    <button id="update-btn">Update</button>
                </div>
            </div>
        </BasicLayout>
    );
}