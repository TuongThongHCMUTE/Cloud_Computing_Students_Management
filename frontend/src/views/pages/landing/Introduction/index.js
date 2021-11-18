import React from 'react';

// Styles
import classes from './Introduction.module.css';

// Material-UI Components Imports
import { Box } from '@material-ui/system';

// Logo SV5T
import logo from '../../../../assets/images/logos/logo-sv5t-square.png'

// My Components Imports
import SectionTitle from '../SectionTitle';

// ===========================|| INTRODUCTION SECTION ||=========================== //

const Introduction = () => {
    return (
        <Box className={classes.container}>
            <SectionTitle>Phong trào "Sinh viên 5 tốt"</SectionTitle>
            <Box className={classes.content}>
                <Box className={classes['content-item']}>
                    <Box className={classes['logo-container']}>
                        <img className={classes.logo} src={logo} alt="Logo Sinh viên 5 tốt" />
                    </Box>
                </Box>
                <Box className={classes['content-item']}>
                    Phong trào <b>“Sinh viên 5 tốt”</b> được Trung ương Hội Sinh viên Việt Nam phát động nhằm hướng tới việc xây dựng hình ảnh sinh viên toàn diện với các tiêu chí: “Học tập tốt”, “Đạo đức tốt”, “Thể lực tốt”, “Tình nguyện tốt”, “Hội nhập tốt”.
                </Box>
                <Box className={classes['content-item']}>
                    Trải qua nhiều năm triển khai thực hiện, nhiều sinh viên bước ra từ phong trào đã khẳng định được bản thân trước nhiều doanh nghiệp – các nhà tuyển dụng trong và ngoài nước.
                </Box>
            </Box>
        </Box>
    )
}

export default Introduction;