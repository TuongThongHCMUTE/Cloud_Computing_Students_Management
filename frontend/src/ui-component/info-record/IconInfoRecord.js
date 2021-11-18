import React from 'react';

// Use module css
import classes from "./IconInfoRecord.module.css";

// Use material UI components
import { Divider, Typography } from "@material-ui/core";

const { Box } = require("@material-ui/system");

const IconInfoRecord = ({ icon, title, value }) => {
    return (
        <>
            <Box className={classes.record}>
                <Box className={classes.title}>
                    <Box className={classes["title-icon"]}>{icon}</Box>
                    <Typography className={classes["title-text"]}>{title}</Typography>
                </Box>
                <Typography className={classes.value}>{value}</Typography>
            </Box>
            <Divider className={classes.line} />
        </>
    );
}

export default IconInfoRecord;