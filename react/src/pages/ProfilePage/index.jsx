import BasicLayout from '../../layouts/BasicLayout';
import Styles from "./styles.module.css";
import PageStyles from "../page.module.css";
import LabeledInput from "../../components/LabeledInput";
import { useSelector } from "react-redux";
import { selectPersist } from "../../store";
import { useRef } from 'react';

export default function ProfilePage(){
    const rootState = useSelector(selectPersist);
    const user = rootState.user ?? {};
    const nameRef = useRef(user.name ?? "");
    const imageRef = useRef(user.image ?? "");

    return (
        <BasicLayout>
            <div className={`${PageStyles.container}`}>
                <div className={Styles.articleContent}>
                    <label id="user-id" className={Styles.profileField}>User ID:</label><br />
                    {/* <label id="user-name">User Name:<input type="text"/></label> */}
                    <LabeledInput id="user-name" type="text" text="User Name:" ref={nameRef} className={Styles.profileField}/>
                    {/* <br /> */}
                    <label id="email" className={Styles.profileField}>Email:</label><br />
                    
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