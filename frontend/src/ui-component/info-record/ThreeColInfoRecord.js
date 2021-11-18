import React from 'react';

// Use module css
import classes from "./ThreeColInfoRecord.module.css";

// Use material UI components
import { Typography } from "@material-ui/core";

const { Box } = require("@material-ui/system");

const ThreeColInfoRecord = ({ title, value }) => {
    return (    
        <Box className={classes.record}>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.divider}>:</Typography>
            <Typography className={classes.value}>{value}</Typography>
        </Box>
    );
}

export default ThreeColInfoRecord;