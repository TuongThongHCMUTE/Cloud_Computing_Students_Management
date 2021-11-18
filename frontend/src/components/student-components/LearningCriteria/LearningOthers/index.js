import React from 'react';

// mui components imports
import { Grid } from '@mui/material';

// project components imports
import Path from 'ui-component/Path';
import SecondaryCard from 'ui-component/cards/SecondaryCard';
import CriteriaForm from 'components/student-components/CriteriaForm';

// merits data imports
import merits from 'assets/dummy-data/merits'

// ===========================|| LEARNING MERIT - OTHER CRITERIAS  ||=========================== //

const LearningOthers = () => {
    // Read list criterias from merits data
    const ethnic = merits.find(merit => merit.id === 'learning');
    const ethnicMadatory = ethnic.categories.find(category => category.id === 'others');
    
    // Set current path
    const pages = ["Hồ sơ", "Học tập tốt", "Tiêu chuẩn khác"];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Path pages={pages} />
            </Grid>
            <Grid item xs={12}>
                <SecondaryCard sx={{ padding: '16px 16px'}}>
                    <CriteriaForm criterias={ ethnicMadatory.items } />
                </SecondaryCard>
            </Grid>
        </Grid>
    )
};

export default LearningOthers;