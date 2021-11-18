import React from 'react';

import { Avatar } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// assets
import DefaultAvt from 'assets/images/users/avt.jpg';

const AvatarUpdate = (props) => {
    const avatar = props.avatar;
    console.log("PROPS: ", props);
    return (
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{ width: "150px", height: "150px"}}>
            { avatar && <Avatar
                src={avatar === "default" ? DefaultAvt : avatar}
                color="inherit"
                sizes='large'
                sx={{ width: '100%', height: '100%'}}
            /> }
        </Box>
        <Button variant="contained" sx={{ mt: 2 }}>Thay ảnh đại diện</Button>
        </Box> 
    );
}

export default AvatarUpdate;