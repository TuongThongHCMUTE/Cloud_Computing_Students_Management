import React from 'react';

// Styles
import classes from './Footer.module.css';

// Material-UI Components Imports
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';

// ===========================|| FOOTER SECTION ||=========================== //

const Footer = () => {
    return (
        <Box className={classes.footer}>
            <Typography className={classes.content}>2021 Copyright - Developed by thongdb and tuongln</Typography>
        </Box>
    )
}

export default Footer;