import React from 'react';

// material-ui
import Box from '@mui/material/Box';

// assets
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// project imports
import SecondaryCard from 'ui-component/cards/SecondaryCard';
import { Typography } from '@material-ui/core';

const Path = ({ pages }) => {
    const paths = pages.map((page, index) => {
        return (
            <Box key={index} sx={{display: "flex", alignItems: "center"}}>
                <KeyboardArrowRightIcon sx={{ margin: "0 16px"}}/>
                <Typography sx={{ fontWeight: '500' }}>{page}</Typography>
            </Box>
        )
    });

    return (
        <SecondaryCard sx={{ p: '12px', display: 'flex', alignItems: 'center'}}>
            <HomeIcon />
            <Typography sx={{ display: 'flex' }}>{paths}</Typography>
        </SecondaryCard>
    )
};

export default Path;