import React, { useState, useEffect } from 'react';

// assets
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

// material-ui components imports
import { Grid } from '@material-ui/core';
import { Box } from "@mui/material";

// project components imports
import TabPanel from 'ui-component/tabs/TabPanel';
import { AntTabs, AntTab } from '../../../ui-component/tabs/CustomizedTabs';
import PersonalBriefInfo from './PersonalBriefInfo';
import PersonalFullInfo from './PersonalFullInfo';
import PersonalUpdateForm from './PersonalUpdateForm';
import PasswordUpdateForm from './PasswordUpdateForm';
import AvatarUpdate from './AvatarUpdate';

const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PersonalInfoTabs = (props) => {
    const [value, setValue] = React.useState(0);
    const [currentUser, setCurrentUser] = useState(props.currentUser);

    useEffect(() => {
        setCurrentUser(props.currentUser)
        console.log('CR USER: ', props.currentUser);
    }, [props.currentUser]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <AntTabs
                value={value} 
                onChange={handleChange}  
                variant="scrollable"
                scrollButtons="auto" 
            >
                <AntTab
                    icon={<TextSnippetRoundedIcon />} 
                    iconPosition="start" 
                    label="Hồ sơ" 
                    {...a11yProps(0)} 
                />
                <AntTab 
                    icon={<PersonPinIcon />} 
                    iconPosition="start" 
                    label="Cập nhật thông tin cá nhân" 
                    {...a11yProps(1)} 
                />
                <AntTab 
                    icon={<LockRoundedIcon />} 
                    iconPosition="start" 
                    label="Đổi mật khẩu" 
                    {...a11yProps(2)} 
                />
            </AntTabs>
        </Box>
        <TabPanel value={value} index={0}>
            <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}} >
                <Grid item md={3.4} xs={12} sm={12} sx={{ mt: '0'}} >
                    <PersonalBriefInfo user={currentUser} />
                </Grid>
                <Grid item md={8.4} xs={12} sm={12} sx={{ mt: '0' }} >
                    <PersonalFullInfo user={currentUser} />
                </Grid>
            </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}} >
                <Grid item lg={2.5} md={12} xs={12} sm={12} sx={{ mt: '0'}} >
                    <AvatarUpdate image={currentUser.image} />
                </Grid>
                <Grid item lg={9.4} md={12} xs={12} sm={12} sx={{ mt: '0' }} >
                    <PersonalUpdateForm user={currentUser} />
                </Grid>
            </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Grid container xs={12} sx={{ display: 'flex', justifyContent: 'space-between'}} >
                <Grid item lg={3.4} md={12} xs={12} sm={12} sx={{ mt: '0'}} >
                    <PersonalBriefInfo user={currentUser} />
                </Grid>
                <Grid item lg={8.4} md={12} xs={12} sm={12} sx={{ mt: '0' }} >
                    <PasswordUpdateForm user={currentUser} />
                </Grid>
            </Grid>
        </TabPanel>
      </Box>
    );
}

export default PersonalInfoTabs;