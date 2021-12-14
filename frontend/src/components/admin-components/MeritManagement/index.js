import React, { useContext } from 'react';

// merits data imports
import merits from 'assets/dummy-data/merits'

// store
import AppContext from 'store/AppContext';
import { gridSpacing } from 'store/constant';

// material-ui components imports
import { Grid } from '@mui/material';

// project components imports
import Path from 'ui-component/Path';
import SecondaryCard from 'ui-component/cards/SecondaryCard';
import MeritInfoTabs from './MeritInfoTabs';

const pages = ["Bình xét", "Tiêu chí"];

// =========================|| MERIT MANAGEMENT  ||========================= //
const MeritManagement = () => {
    const { state } = useContext(AppContext);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Path pages={pages} />
            </Grid>
            <Grid item xs={12}>
                <SecondaryCard sx={{ padding: '16px 16px'}}>
                    <MeritInfoTabs 
                        role={state.userInfo.role} 
                        merits={merits}
                    />
                </SecondaryCard>
            </Grid>
        </Grid>
    )
};

export default MeritManagement;