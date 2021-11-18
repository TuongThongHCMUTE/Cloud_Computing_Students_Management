import React from 'react';

// Styles
import classes from './Merits.module.css';

// Material-UI Components Imports
import { Typography } from "@material-ui/core";
import { Box } from '@material-ui/system';

// Merits Images
import imgDaoDuc from '../../../../assets/images/merits/dao-duc-tot.png';
import imgHocTap from '../../../../assets/images/merits/hoc-tap-tot.png';
import imgTheLuc from '../../../../assets/images/merits/the-luc-tot.png';
import imgTinhNguyen from '../../../../assets/images/merits/tinh-nguyen-tot.png';
import imgHoiNhap from '../../../../assets/images/merits/hoi-nhap-tot.png';

// My Components Imports
import SectionTitle from '../SectionTitle';

// ===========================|| MERITS SECTION ||=========================== //

const Merits = () => {
    return (
        <Box className={classes.container}>
            <SectionTitle>Các tiêu chí</SectionTitle>
            <Box className={classes.content}>
                <Box className={classes['content-item']}>
                    <Box className={classes['image-container']}>
                        <img className={classes['content-image']} src={imgDaoDuc} alt="Đạo đức tốt" />
                    </Box>
                    <Typography className={classes['content-text']}>Đạo đức tốt</Typography>
                </Box>
                <Box className={classes['content-item']}>
                    <Box className={classes['image-container']}>
                        <img className={classes['content-image']} src={imgHocTap} alt="Học tập tốt" />
                    </Box>
                    <Typography className={classes['content-text']}>Học tập tốt</Typography>
                </Box>
                <Box className={classes['content-item']}>
                    <Box className={classes['image-container']}>
                        <img className={classes['content-image']} src={imgTheLuc} alt="Thể lực tốt" />
                    </Box>
                    <Typography className={classes['content-text']}>Thể lực tốt</Typography>
                </Box>
                <Box className={classes['content-item']}>
                    <Box className={classes['image-container']}>
                        <img className={classes['content-image']} src={imgTinhNguyen} alt="Tình nguyện tốt" />
                    </Box>
                    <Typography className={classes['content-text']}>Tình nguyện tốt</Typography>
                </Box>
                <Box className={classes['content-item']}>
                    <Box className={classes['image-container']}>
                        <img className={classes['content-image']} src={imgHoiNhap} alt="Hội nhập tốt" />
                    </Box>
                    <Typography className={classes['content-text']}>Hội nhập tốt</Typography>
                </Box>
            </Box>
            <Box className={classes['btn-container']}>
                <button className={classes.btn}>Tham khảo bộ tiêu chí</button>
            </Box>
        </Box>
    )
}

export default Merits;