import React from 'react';

// material-ui
import { makeStyles} from '@material-ui/styles';
import { Card, Avatar, Typography } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

// assets
import DefaultAvt from 'assets/images/users/avt.jpg';

import { url } from 'store/constant';

// style const
const useStyles = makeStyles((theme) => ({
    headerAvatar: {
        ...theme.typography.mediumAvatar,
        height: '100px',
        width: '100px',
        margin: '8px !important'
    },
    line: {
        height: '2px',
        width: '100%',
        margin: '16px -16px',
        backgroundColor: 'rgba(144, 202, 249, 0.46)'
    },
    name: {
        ...theme.typography.h6,
        fontSize: '18px',
        fontWeight: '700'
    },
    faculty: {
        ...theme.typography.h6,
        fontSize: '16px',
        fontWeight: '400'
    },
    honorTitle: {
        ...theme.typography.h6,
        fontSize: '24px',
        fontWeight: '700',
        color: 'var(--color-dark-blue)',
        textShadow: '2px 2px 2px var(--color-light-gray)'
    },
    iconContainer: {
        display: 'flex',
        marginBottom: '8px'
    }
}));


// =============================|| INFO CARD ||============================= //

const InfoCard = ({data, sx = {}, ...others }) => {
    const classes = useStyles();

    let studentName = "";
    if (data.fullName) {
        studentName += data.fullName;
    }
    if (data.mssv) {
        studentName += " - " + data.mssv;
    } else {
        studentName += " - " + data.email.substring(0, 8);
    }

    return (
        <Card
            sx={{
                padding: '16px',
                mt: '24px',
                mb: '0px',
                border: '1px solid',
                borderColor: 'rgba(144, 202, 249, 0.46)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...sx
            }}
            {...others}
        >
            <Avatar
                src={
                    !data.image || data.image === 'default'
                    ? DefaultAvt 
                    : url + "/forms/proofs?key=" + data.image
                }
                className={classes.headerAvatar}
                color="inherit"
            />
            <Typography className={classes.name}>
                { studentName }
            </Typography>
            <Typography className={classes.faculty}>
                { data.faculty ? data.faculty : "" }
            </Typography>
            <div className={classes.line} />
            <div className={classes.iconContainer}>
                <MilitaryTechIcon sx={{ fontSize: '30px'}} />   
                <MilitaryTechIcon sx={{ fontSize: '50px', margin: '-4px'}}/> 
                <MilitaryTechIcon sx={{ fontSize: '30px'}}/>  
            </div>
            <Typography className={classes.honorTitle}>
                Sinh viên 5 tốt {data.expectedLevel}
            </Typography>
        </Card>
    );
};

export default InfoCard;
