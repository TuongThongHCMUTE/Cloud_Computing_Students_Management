import React, { useState, useContext } from 'react';
import AppContext from '../../../../store/AppContext';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@material-ui/core';
import Alert from '@mui/material/Alert';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';

// APIs
import { login } from '../../../../apis/auth';

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: `${theme.palette.grey[100]} !important`,
        color: `${theme.palette.grey[900]}!important`,
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//= ===========================|| FIREBASE - LOGIN ||============================//

const FirebaseLogin = (props, { ...others }) => {
    const { dispatch } = useContext(AppContext);

    const classes = useStyles();

    const customization = useSelector((state) => state.customization);
    const scriptedRef = useScriptRef();

    // Hooks
    const [checked, setChecked] = useState(true);
    const [userInput, setUserInput] = useState({ email: "", password: ""});
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState(null);

    // Route
    const navigate = useNavigate();

    // Handle Events
    const googleHandler = async () => {
        console.error('Login');
    };

    const handleInputChange = (e) => {
        //console.log("EVENT: ", e);
        setUserInput({...userInput, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            className={classes.redButton}
                            onClick={googleHandler}
                            size="large"
                            variant="contained"
                        >
                            <img src={Google} alt="google" width="20px" className={classes.loginIcon} /> Đăng nhập với Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider className={classes.signDivider} orientation="horizontal" />
                        <AnimateButton>
                            <Button
                                variant="outlined"
                                className={classes.signText}
                                sx={{ borderRadius: `${customization.borderRadius}px` }}
                                disableRipple
                                disabled
                            >
                                HOẶC
                            </Button>
                        </AnimateButton>
                        <Divider className={classes.signDivider} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Typography variant="subtitle1">Đăng nhập bằng tài khoản</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: userInput.email,
                    password: userInput.password,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Email không hợp lệ').max(255).required('Vui lòng nhập email'),
                    password: Yup.string().max(255).required('Vui lòng nhập password')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            const res = await login(userInput);

                            if (res.data.status === 'success') {
                                const user = res.data.data;
                                const currentUser = {
                                    ...user,
                                    fullName: user.lastName + " " + user.firstName,
                                    avatar: user.avatar||'default'
                                }
                                
                                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                                dispatch({type: "CURRENT_USER_INFO", payload: currentUser});

                                setStatus({ success: true });
                                setSubmitting(false);
                                navigate('/merits')                            
                            } else {
                                setAlert( { type: 'error', content: 'Đã xảy ra lỗi, vui lòng thử lại!' });
                            }
                        }
                    } catch (err) {
                        if (scriptedRef.current) {
                            console.log(err);
                            setStatus({ success: false });
                            setAlert({ type: 'error', content: err.response.data.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        {errors.submit && (
                            <Box sx={{ mt: 0}}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        { alert && 
                            <Alert severity={alert.type}>
                                <a href={alert.destination} style={{ color: 'var(--color-dark-gray)', fontSize: '11'}} >{ alert.content }</a>
                            </Alert> 
                        }
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email/Tên đăng nhập</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    handleInputChange(e);
                                }}
                                label="Email Address / Username"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {errors.email}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-password-login">Mật khẩu</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    handleInputChange(e);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Ghi nhớ đăng nhập"
                            />
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to="/pages/forgot-password/forgot-password3"
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Quên mật khẩu?
                            </Typography>
                        </Stack>

                        <Box
                            sx={{
                                mt: 2
                            }}
                        >
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Đăng nhập
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseLogin;
