import React from 'react';

// mui components imports
import { Grid } from '@mui/material';

// project components imports
import Path from 'ui-component/Path';
import SecondaryCard from 'ui-component/cards/SecondaryCard';
import CriteriaForm from 'components/student-components/CriteriaForm';

// merits data imports
import merits from 'assets/dummy-data/merits'

// ===========================|| ETHNIC MERIT - MANDATORY CRITERIAS  ||=========================== //

const IntegrationLanguages = () => {
    // Read list criterias from merits data
    const ethnic = merits.find(merit => merit.id === 'integration');
    const ethnicMadatory = ethnic.categories.find(category => category.id === 'foreign-languages');
    
    // Set current path
    const pages = ["Hồ sơ", "Đạo đức tốt", "Tiêu chuẩn bắt buộc"];

    return (
        <Grid container spacing={3}>
            {/* Path section */}
            <Grid item xs={12}>
                <Path pages={pages} />
            </Grid>
            {/* Content section */}
            <Grid item xs={12}>
                <SecondaryCard sx={{ padding: '16px 16px'}}>
                    <CriteriaForm criterias={ ethnicMadatory.items } />
                </SecondaryCard>
            </Grid>
        </Grid>
    )
};

export default IntegrationLanguages;