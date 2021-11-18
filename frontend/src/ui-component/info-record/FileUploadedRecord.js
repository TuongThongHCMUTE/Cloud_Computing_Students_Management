import React from 'react'

import classes from "./FileUploadedRecord.module.css";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

const FileUploadedRecord = () => {
    return (
        <Grid className={classes.container} lg={6} sx={12}>
            <p className={classes.file}>File Name</p>
            <Box className={classes.btn}>
                <CloseIcon className={classes.icon}/>
            </Box>
        </Grid>
    )
}

export default FileUploadedRecord
