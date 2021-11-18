import React from 'react';

// material-ui
import { makeStyles} from '@material-ui/styles';
import { Card, Avatar, Typography, Divider } from '@material-ui/core';
import Box from '@mui/material/Box';

// assets
import DefaultAvt from 'assets/images/users/avt.jpg';

// style const
const useStyles = makeStyles((theme) => ({
    headerAvatar: {
        ...theme.typography.mediumAvatar,
        height: '50px',
        width: '50px',
        margin: '8px !important'
    },
    headerTitle: {
        ...theme.typography.h6,
        fontSize: '16px',
        color: 'var(--color-black)'
    },
    line: {
        margin: '16px -16px',
        borderColor: 'rgba(144, 202, 249, 0.46)'
    }
}));


// ===========================|| INFO CARD ||=========================== //

const InfoCard = ({children, header, sx = {}, ...others }) => {
    const classes = useStyles();

    return (
        <Card
            sx={{
                padding: '16px',
                mt: '24px',
                mb: '0px',
                border: '1px solid',
                borderColor: 'rgba(144, 202, 249, 0.46)',
                ...sx
            }}
            {...others}
        >
            <Box sx={{ display: "flex"}}>
                { header.image && <Avatar
                    src={header.image === 'default' ? DefaultAvt : header.image}
                    className={classes.headerAvatar}
                    color="inherit"
                /> }
                <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center' }}>
                    { header.title && <Typography className={classes.headerTitle} sx={{m: '2px 8px'}}>{header.title}</Typography> }
                    { header.subTitle && <Typography className={classes.headerSubTitle} sx={{m: '2px 8px'}}>{header.subTitle}</Typography> }
                </Box>
            </Box> 
            <Divider className={classes.line} />   
            {children}
        </Card>
    );
};

export default InfoCard;
