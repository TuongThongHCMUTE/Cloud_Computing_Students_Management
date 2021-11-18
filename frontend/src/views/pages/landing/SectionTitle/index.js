import React from 'react';

// Material-UI Components Imports
import { Box } from '@material-ui/system';

// Styles
import classes from "./SectionTitle.module.css";

// ===========================|| MY SECTION TITLE COMPONENT ||=========================== //

const SectionTitle = ({ children }) => (
    <div className={classes.container}>
        <Box className={[classes.line, classes['line--left']]} />
        <div className={classes.title}>{children}</div>
        <Box className={[classes.line, classes['line--right']]} />
    </div>
)

export default SectionTitle;