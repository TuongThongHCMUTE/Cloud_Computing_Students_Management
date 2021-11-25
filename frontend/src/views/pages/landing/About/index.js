import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import classes from './About.module.css';

// Material UI components
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';

// Icons
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

// Images
import imgThongDB from '../../../../assets/images/authors/thongdb-34.jpg';
import imgDienTVB from '../../../../assets/images/authors/dientvb-34.png';
import imgTuongLN from '../../../../assets/images/authors/tuongln-34.jpg';

// My components
import SectionTitle from '../SectionTitle';

// ===========================|| ABOUT WEBSITE SECTION ||=========================== //

const About = () => {
    return (
        <Box className={classes.container}>
            <SectionTitle>Về website</SectionTitle>
            <Box className={classes.content}>
                <Box className={classes['content-intro']}>
                    Trang web được xây dựng nhằm mục đích hỗ trợ sinh viên trong việc tư vấn và bình xét hồ sơ “Sinh viên 5 tốt”.
                </Box>
                <Box className={classes['content-features']}>
                    <Typography className={classes['feature-title']}>Tính năng:</Typography>
                    <Box className={classes['feature-item']}>
                        <ThumbUpAltIcon /> 
                        <Box className={classes['feature-text']}>
                            Nộp và duyệt hồ sơ “Sinh viên 5 tốt” các cấp.
                        </Box> 
                    </Box>
                    <Box className={classes['feature-item']}>
                        <ThumbUpAltIcon />
                        <Box className={classes['feature-text']}>
                            Chat app hỗ trợ tư vấn cho sinh viên.
                        </Box> 
                    </Box>
                    <Box className={classes['feature-item']}>
                        <ThumbUpAltIcon /> 
                        <Box className={classes['feature-text']}>
                            Trang tuyên dương những cá nhân và tập thể có thành tích xuất sắc.
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.authors}>
                <Typography className={classes['author-title']}>Nhóm tác giả</Typography>
                <Box className={classes['authors-group']}>
                    <Box className={classes.author}>
                        <img className={classes['author-image']} src={imgThongDB} alt=""/>
                        <Box className={classes['author-info']}>
                            <Typography className={classes['author-name']}>Đinh Bách Thông</Typography>
                            <Typography className={classes['author-id']}>18110207</Typography>
                            <Box className={classes['author-social']}>
                                <Link to="#"><FacebookRoundedIcon/></Link>
                                <Link to="#"><LinkedInIcon/></Link>
                                <Link to="#"><GitHubIcon/></Link>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.author}>
                        <img className={classes['author-image']} src={imgDienTVB} alt=""/>
                        <Box className={classes['author-info']}>
                            <Typography className={classes['author-name']}>Trần Võ Bửu Điền</Typography>
                            <Typography className={classes['author-id']}>18110096</Typography>
                            <Box className={classes['author-social']}>
                                <Link to="#"><FacebookRoundedIcon/></Link>
                                <Link to="#"><LinkedInIcon/></Link>
                                <Link to="#"><GitHubIcon/></Link>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.author}>
                        <img className={classes['author-image']} src={imgTuongLN} alt=""/>
                        <Box className={classes['author-info']}>
                            <Typography className={classes['author-name']}>Lê Nhật Tường</Typography>
                            <Typography className={classes['author-id']}>18110234</Typography>
                            <Box className={classes['author-social']}>
                                <Link to="#"><FacebookRoundedIcon/></Link>
                                <Link to="#"><LinkedInIcon/></Link>
                                <Link to="#"><GitHubIcon/></Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default About;