import BasicLayout from "../../layouts/BasicLayout";
import Styles from "./styles.module.css";
import PageStyles from "../page.module.css";
import LabeledInput from "../../components/LabeledInput";
import { useDispatch, useSelector } from "react-redux";
import { selectPersist, setUserImage } from "../../store";
import { useState, useRef } from "react";
import { BASE_URL } from "../../utils";
import axios from "axios";

// TODO: 點擊 Update 按鈕後，再送出更新請求
export default function ProfilePage() {
    const PROFILE_URL = `${BASE_URL}/users/profile`;
    // useDispatch: 用於向 Redux Store 發送 action，以便 reducer 能夠根據 action 的類型和數據來更新應用程序的狀態。
    const dispatch = useDispatch();
    const rootState = useSelector(selectPersist);
    const user = rootState.user ?? {};
    console.log(`user: ${JSON.stringify(user)}`);
    const [name, setName] = useState(user.name ?? "");
    const fileInputRef = useRef(null);

    function onNameChanged(e) {
        setName(e.target.value);
    }

    function onUploadBtnClicked() {
        fileInputRef.current.click();
    }

    function onImageChanged(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const file = e.target.files[0];
            console.log("Selected file:", file);

            // image.src = file;
            const formData = new FormData();
            formData.append("image", file);
            const jwt = rootState.jwt;
            axios
                .patch(PROFILE_URL, formData, {
                    headers: { authorization: `Bearer ${jwt}` },
                })
                .then((response) => {
                    const data = response.data;
                    console.log(`data.image: ${data.image}`);
                    dispatch(setUserImage(data.image));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <BasicLayout>
            <div className={`${PageStyles.container}`}>
                <div className={Styles.articleContent}>
                    <label id="user-id" className={Styles.profileField}>
                        User ID: {user.id ?? ""}
                    </label>
                    <br />
                    <LabeledInput
                        id="user-name"
                        type="text"
                        text="User Name:"
                        value={name}
                        className={Styles.profileField}
                        onChange={onNameChanged}
                    />
                    {/* <br /> */}
                    <label id="email" className={Styles.profileField}>
                        Email: {user.email ?? ""}
                    </label>
                    <br />

                    {/* TODO: <input type="file" accept="image/*" /> 取代 <button id="upload-btn"> */}
                    <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                        <input
                            id="file-upload"
                            type="file"
                            name="image"
                            style={{ display: "none" }}
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={onImageChanged}
                        />
                    </label>
                    <button id="upload-btn" onClick={onUploadBtnClicked}>
                        上傳圖片
                    </button>
                    <br />
                    <img
                        id={Styles.profileImage}
                        src={`${BASE_URL}/users/images/${user.id}/${user.image}`}
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
