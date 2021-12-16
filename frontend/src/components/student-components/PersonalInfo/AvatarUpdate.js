import React, { useState, useContext } from 'react';

// apis
import { uploadFile, getFile } from 'apis/files';
import { getCurrentUserInfo} from 'apis/auth';
import { updateStudent } from 'apis/students';
import { updateManager } from 'apis/managers';

// store
import AppContext from 'store/AppContext';
import { url } from 'store/constant';

// assets
import DefaultAvt from 'assets/images/users/avt.jpg';

// material-ui import
import { Avatar } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// =========================|| AVATAR UPDATE  ||========================== //
const AvatarUpdate = (props) => {
    const { state, dispatch} = useContext(AppContext);
    const [avatar, setAvatar] = useState(props.image || 'default');
    
    const onFileDrop = async (e) => {
        const image = e.target.files[0];
        if (image) {
            const res = await uploadFile(image, 'avatars');
            
            if (res.status === 'success') {
                const imagePath = res.data.imageKey;
                const getFileRes = await getFile(imagePath);
                if (getFileRes.data.status === 'success') {
                    const newAvatar = getFileRes.data.url;
                    const newUserInfo = {...state.userInfo, image: newAvatar }
                    setAvatar(newAvatar)

                    const updateUserRes = state.userInfo.uRole === 'SV'
                    ? await updateStudent(newUserInfo)
                    : await updateManager(newUserInfo)
                    if (updateUserRes.data.status === 'success') {
                        // Save current user to context
                        dispatch({type: "CURRENT_USER_INFO", payload: newUserInfo});
                        localStorage.setItem('currentUser', JSON.stringify(newUserInfo));
                    }
                }
            }
        }
    }

    return (
        <Box sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
            }}
        >
            <Box sx={{ width: "150px", height: "150px"}}>
                { avatar && <Avatar
                    src={
                        avatar === "default" 
                        ? DefaultAvt 
                        : avatar
                    }
                    color="inherit"
                    sizes='large'
                    sx={{ width: '100%', height: '100%'}}
                /> }
            </Box>
            <Button variant="contained" sx={{ mt: 2 }}>
                Thay ảnh đại diện
                <input 
                    type="file" 
                    value="" 
                    accept=".png,.jpg,.jpeg"
                    onChange={onFileDrop}
                    style={{
                        opacity: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                />
            </Button>
        </Box> 
    );
}

export default AvatarUpdate;