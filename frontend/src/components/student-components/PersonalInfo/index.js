import React, { useContext } from 'react';

// material-ui components imports
import { Grid } from '@material-ui/core';

// project components imports
import { gridSpacing } from 'store/constant';
import Path from 'ui-component/Path';
import SecondaryCard from 'ui-component/cards/SecondaryCard';
import PersonalInfoTabs from './PersonalInfoTabs';

// context
import AppContext from 'store/AppContext';

const PersonalInfo = () => {
    const pages = ["Hồ sơ", "Thông tin cá nhân"];

    const { state } = React.useContext(AppContext);

    console.log("STATE.USER", state.userInfo);
    
    return (
        <Grid container spacing={gridSpacing}>
            {console.log("COMP RENDERED")}
            <Grid item xs={12}>
                <Path pages={pages} />
            </Grid>
            <Grid item xs={12}>
                <SecondaryCard sx={{ padding: '16px 16px'}}>
                    <PersonalInfoTabs currentUser={state.userInfo}/>
                </SecondaryCard>
            </Grid>
        </Grid>
    )
};

export default PersonalInfo;