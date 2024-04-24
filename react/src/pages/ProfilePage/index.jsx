import BasicLayout from '../../layouts/BasicLayout';

export default function ProfilePage(){
    return (
        <BasicLayout>
            <div className="article-content">
                <label id="user-id">User ID:</label>
                <br />
                <label id="user-name">User Name:<input type="text"/></label>
                <br />
                <label id="email">Email:</label>
                <br />
                <label htmlFor="file-upload" style={{cursor: "pointer"}}>
                <input id="file-upload" type="file" name="image" style={{display: "none"}} accept="image/*" />
                <button id="upload-btn">上傳圖片</button>
                </label>
                <br />
                <div id="profile-img">
                <img 
                    id="profile-image"
                    src=""
                    alt="user profile image"
                />
                </div>
            </div>
            <div className="btn-list">
                <button id="cancel-btn">Cancel</button>
                <button id="update-btn">Update</button>
            </div>
        </BasicLayout>
    );
}