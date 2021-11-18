import React from 'react';

// Styles
import classes from './Contact.module.css';

// Meterial-UI Components Import
import { Typography } from "@material-ui/core";
import { Box } from '@material-ui/system';

// Icons
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';

// My Components Imports
import SectionTitle from '../SectionTitle';

// ===========================|| CONTACT SECTION ||=========================== //

const Contact = () => {
    return (
        <Box className={classes.container}>
            <SectionTitle>Liên hệ</SectionTitle>
            <Box className={classes.content}>
                <Box className={classes['map-item']}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.484231881356!2d106.76973361526056!3d10.850726660783783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1636263453551!5m2!1svi!2s" title="myPosition" allowFullScreen loading="lazy"></iframe>
                </Box>
                <Box className={classes['content-item']}>
                    <Typography className={classes['item-title']}>Địa chỉ</Typography>
                    <Box className={classes['item-value']}>
                        <PlaceIcon />
                        <Typography className={classes['value-text']}>01 Võ Văn Ngân, phường Linh Chiểu, Tp. Thủ Đức, Tp. Hồ Chí Minh</Typography>
                    </Box>
                </Box>
                <Box className={classes['content-item']}>
                    <Typography className={classes['item-title']}>Liên hệ</Typography>
                    <Box className={classes['item-value']}>
                        <CallIcon />
                        <Typography className={classes['value-text']}>0123456789</Typography>
                    </Box>
                    <Box className={classes['item-value']}>
                        <MailIcon />
                        <Typography className={classes['value-text']}>emailaddress@hcmute.edu.vn</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Contact;