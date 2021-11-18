import React, { useEffect, useState, useContext } from 'react';
import AppContext from 'store/AppContext';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';
import Alert from '@mui/material/Alert';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// apis
import { register } from '../../../../apis/auth';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

//= ==========================|| FIREBASE - REGISTER ||===========================//

const FirebaseRegister = ({ ...others }) => {
    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    
    // Use Context Hooks
    const { dispatch } = useContext(AppContext);

    // Use State Hooks
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');
    const [userInput, setUserInput] = useState({ firstName: "", lastName: "", email: "", password: ""});
    const [alert, setAlert] = useState(null);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowRePassword = () => {
        setShowRePassword(!showRePassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleInputChange = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rePassword: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Email không hợp lệ').max(255).required('Vui lòng nhập email'),
                    password: Yup.string().max(255).required('Vui lòng nhập mật khẩu'),
                    rePassword: Yup.string()
                    .required('Nhập lại mật khẩu')
                    .test('match', 'Mật khẩu không khớp', 
                        function(rePassword) { 
                            return !rePassword || rePassword === this.parent.password; 
                        }),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            const postData = {
                                email: userInput.email,
                                password: userInput.password,

                                firstName: userInput.firstName,
                                lastName: userInput.lastName
                            }

                            const res = await register(postData);

                            if (res.data.status === 'success') {
                                // const { fullName, email, content } = res.data.data;

                                // dispatch({type: "CURRENT_USER", payload: { fullName, email }});
    
                                setStatus({ success: true });
                                setAlert( { type: 'success', content: 'Đăng ký thành công!' });
                                
                                setSubmitting(false);
                            } else {
                                setAlert( { type: 'error', content: 'Đã xảy ra lỗi, vui lòng thử lại!' });
                            }
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setAlert( { type: 'error', content: err.response.data.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        {errors.submit && ( 
                            <Box sx={{ mt: 0 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                        { alert && 
                            <Alert severity={alert.type}>
                                <a href={alert.destination} style={{ color: 'var(--color-dark-gray)', fontSize: '11'}} >{ alert.content }</a>
                            </Alert> 
                        }
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Họ và tên đệm"
                                    margin="normal"
                                    name="lastName"
                                    type="text"
                                    defaultValue=""
                                    className={classes.loginInput}
                                    onChange={(e) => { handleInputChange(e); }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Tên"
                                    margin="normal"
                                    name="firstName"
                                    type="text"
                                    defaultValue=""
                                    className={classes.loginInput}
                                    onChange={(e) => {handleInputChange(e)}}
                                />
                            </Grid>
                        </Grid>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    handleInputChange(e);
                                }}
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {' '}
                                    {errors.email}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-password-register">Mật khẩu</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                    handleInputChange(e);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            id="showPassword"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box
                                    sx={{
                                        mb: 0
                                    }}
                                >
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                backgroundColor={level.color}
                                                sx={{
                                                    width: 85,
                                                    height: 8,
                                                    borderRadius: '7px'
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <FormControl fullWidth error={Boolean(touched.rePassword && errors.rePassword)} className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-re-password-register">Nhập lại mật khẩu</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-re-password-register"
                                type={showRePassword ? 'text' : 'password'}
                                value={values.rePassword}
                                name="rePassword"
                                label="rePassword"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            id="show-re-password"
                                            aria-label="toggle re password visibility"
                                            onClick={handleClickShowRePassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showRePassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.rePassword && errors.rePassword && (
                                <FormHelperText error id="standard-weight-helper-text-re-password-register">
                                    {' '}
                                    {errors.rePassword}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

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
                                    Đăng ký
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
