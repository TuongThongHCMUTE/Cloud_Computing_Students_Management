import React from 'react';

// Material-ui component imports
import { Grid } from '@material-ui/core';

// Styles
import classes from "./Banner.module.css";

// ===========================|| BANNER SECTION ||=========================== //

const Banner = () => {
    return (
        <Grid container sx={12} className={classes.banner}>
        </Grid>
    )
}

export default Banner;