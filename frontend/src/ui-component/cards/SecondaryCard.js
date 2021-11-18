import React from 'react';

// material-ui
import { Card } from '@material-ui/core';

// ===========================|| CUSTOM SUB CARD ||=========================== //

const SecondaryCard = ({children, sx = {}, ...others }) => {
    return (
        <Card
            sx={{
                padding: '16px',
                border: '1px solid',
                borderColor: 'rgba(144, 202, 249, 0.46)',
                ...sx
            }}
            {...others}
        >
            {children}
        </Card>
    );
};

export default SecondaryCard;
