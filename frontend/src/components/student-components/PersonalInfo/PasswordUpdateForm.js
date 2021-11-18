import React, { useState } from 'react';

// material-ui components imports
import { Grid } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

// project components imports
import InfoCard from 'ui-component/cards/InfoCard';
import { initialState } from 'store/customizationReducer';

// APIs
import { changePassword } from 'apis/auth';

const PasswordUpdateForm = () => {
    const initState = {
        currentPassword: '',
        newPassword: '',
        rePassword: '',
        showCurrentPassword: false,
        showNewPassword: false,
        showRePassword: false,
        currentPasswordError: '',
        newPasswordError: '',
        rePasswordError: ''
      }

    const [values, setValues] = useState(initState);
    const [alert, setAlert] = useState(null);
    
    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = (props) => {
    setValues({
        ...values,
        [props]: !values[props],
    });
    };
    
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const handleSubmit = async () => {
        if (values.currentPassword.length === 0) {
            setAlert( { type: 'error', content: "Nhập mật khẩu cũ!" });
            return;
        } else if (values.newPassword.length === 0) {
            setAlert( { type: 'error', content: "Nhập mật khẩu mới" });
            return;
        } else if (values.newPassword.length < 8) {
            setAlert( { type: 'error', content: "Mật khẩu phải có ít nhất 8 ký tự!" });
            return;
        } else if (values.newPassword !== values.rePassword) {
            setAlert( { type: 'error', content: "Mật khẩu mới không khớp!" });
            return;
        }

        // Call API
        try {
            const res = await changePassword(values.currentPassword, values.newPassword, values.rePassword);

            if (res.data.status === 'success') {
                setAlert( { type: 'success', content: 'Cập nhật thông tin thành công!' });
                setTimeout(() => {
                    setAlert(null);
                }, 2000)
            } else {
                setAlert( { type: 'error', content: 'Đã xảy ra lỗi, vui lòng thử lại!' });
                setTimeout(() => {
                    setAlert(null);
                }, 2000)
            }

        } catch (err) {
            setAlert( { type: 'error', content: err.response.data.message });
            setTimeout(() => {
                setAlert(null);
            }, 2000)
        }
    }

    const handleCancel = () => {
        setValues(initialState);
    }

    return (
        <InfoCard header={{ title: 'Đổi mật khẩu'}}>
            <Grid container xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                
                {/* Current Password Field */}
                <Grid md={8} xs={12} sx={{p: 1}} >
                    { alert && 
                    <Alert severity={alert.type} sx={{ mb: 2 }}>
                        <a href={alert.destination} style={{ color: 'var(--color-dark-gray)', fontSize: '11'}} >{ alert.content }</a>
                    </Alert> 
                    }
                    <FormControl error={values.currentPasswordError} sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu cũ</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showCurrentPassword ? 'text' : 'password'}
                            value={values.currentPassword}
                            onChange={handleChange('currentPassword')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('showCurrentPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {values.showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            aria-describedby="current-password-error-text"
                            label="Mật khẩu cũ"
                        />
                        <FormHelperText id="current-password-error-text">{values.currentPasswordError}</FormHelperText>
                    </FormControl>
                </Grid>

                {/* New Password Field */}
                <Grid md={8} xs={12} sx={{p: 1}} >
                    <FormControl error={values.newPasswordError} sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu mới</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showNewPassword ? 'text' : 'password'}
                            value={values.newPassword}
                            onChange={handleChange('newPassword')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('showNewPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            aria-describedby="new-password-error-text"
                            label="Mật khẩu mới"
                        />
                        <FormHelperText id="new-password-error-text">{values.newPasswordError}</FormHelperText>
                    </FormControl>
                </Grid>

                {/* Repeat Password Field */}
                <Grid md={8} xs={12} sx={{p: 1}} >
                    <FormControl error={values.rePasswordError} sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Nhập lại mật khẩu</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showRePassword ? 'text' : 'password'}
                            value={values.rePassword}
                            onChange={handleChange('rePassword')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword('showRePassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {values.showRePassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            aria-describedby="re-password-error-text"
                            label="Nhập lại mật khẩu"
                        />
                        <FormHelperText id="re-password-error-text">{values.rePasswordError}</FormHelperText>
                    </FormControl>
                </Grid>

                {/* Button Group */}
                <Grid md={8} xs={12} direction="row" container justifyContent="flex-end" sx={{ width: '100%', p: 1 }}>
                    <Button variant="text" onClick={handleCancel}>Hủy</Button>
                    <Button variant="contained" sx={{ ml:2 }} onClick={handleSubmit}>Lưu thay đổi</Button>
                </Grid>
            </Grid>
        </InfoCard>
    )
};

export default PasswordUpdateForm;