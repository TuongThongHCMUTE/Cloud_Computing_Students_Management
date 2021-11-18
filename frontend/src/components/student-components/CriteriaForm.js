import React from 'react'
import CriteriaItem from './CriteriaItem'
import Button from '@mui/material/Button';

import SaveIcon from '@mui/icons-material/Save';

const CriteriaForm = ({ criterias }) => {
    const criteriaItems = criterias.map(item => <CriteriaItem title={ item.content } key={ item.id } />)
    return (
        <div>
            { criteriaItems }
            <Button 
                variant="contained"         
                startIcon={<SaveIcon />} 
                size="large"
                sx={{ float: 'right', m: '16px'}}
            >
                LƯU HỒ SƠ
            </Button>
        </div>
    )
}

export default CriteriaForm
