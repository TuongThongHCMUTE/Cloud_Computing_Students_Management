import React, { useContext } from 'react';
import AppContext from 'store/AppContext';

import { Link } from 'react-router-dom';

// material-ui component imports
import { Box } from '@material-ui/system';

// Use module css
import classes from "./Header.module.css";
import { Grid } from '@material-ui/core';

// Icons
import MenuIcon from '@mui/icons-material/Menu';

// SV5T Logo
import whiteLogo from "assets/images/logos/logo-sv5t-full-white.png";

// ===========================|| HEADER SECTION ||=========================== //

const Header = (props) => {
    const { state } = useContext(AppContext)
    const { userInfo } = state;

    return (
        <Grid container xs={12} className={[classes.header, props.isTransparent && classes['header--transparent']]}>
            <Grid className={classes['header-content']} item lg={8} md={12} sm={12} xs={12}>
                <Box className={classes.container}>
                    <Link to="" className={classes.logo}>
                        <img className={classes['logo-img']} src={whiteLogo} alt="logo" />
                    </Link>
                    <Box className={classes['mobile-menu-btn']}>
                        <MenuIcon />
                        <Box className={classes['mobile-menu']}>
                            { userInfo ? 
                                <Link className={classes['mobile-home']} to="/merits"><b>Trang cá nhân</b></Link> 
                                : 
                                <>
                                    <Link className={classes['mobile-auth']} to="/login">Đăng nhập</Link>
                                    <Link className={classes['mobile-auth']} to="/register">Đăng ký</Link>
                                </> 
                            }   
                        </Box>
                    </Box>

                    <Box className={classes.pages}>
                        { userInfo
                            ? <Link className={classes.home} to="/merits"><b>Trang cá nhân</b></Link>
                            : 
                            <>
                                <Link className={classes.auth} to="/login">Đăng nhập</Link>
                                <Link className={classes.auth} to="/register">Đăng ký</Link>
                            </>
                        }
                    </Box>  
                </Box>
            </Grid>
        </Grid>
    )
}

export default Header;