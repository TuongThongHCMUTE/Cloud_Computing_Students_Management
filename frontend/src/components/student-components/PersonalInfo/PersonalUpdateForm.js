import React, { useState, useEffect, useContext } from 'react';
import AppContext from 'store/AppContext';

// Third-party
import moment from 'moment';

// material-ui components imports
import {
    Grid,
    OutlinedInput,
    InputLabel,
    FormControl,
    TextField,
    MenuItem,
    Select,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Button,
    Alert
} from '@mui/material';

// project components imports
import InfoCard from 'ui-component/cards/InfoCard';

// APIs
import { updateStudent } from 'apis/students';
import { updateManager} from 'apis/managers';
import { getAllFaculties } from 'apis/faculties';

const PersonalUpdateForm = (props) => {
    const { state, dispatch } = useContext(AppContext);

    const ethnicGroups = ['Dân tộc', 'Kinh', 'Hoa', 'Khmer'];
    const [faculties, setFaculties] = useState([]); 
    const [user, setUser] = useState(state.userInfo);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const listFaculties =  async () => {
            try {    
                const response = await getAllFaculties();
                const faculties = response.data.data;
        
                if(faculties.length > 0) {         
                    setFaculties(faculties.filter(f => f.isDisplayed))
                }
            } catch (error) {
                console.log(error);
            }
        };

        listFaculties();
    }, []);
    
    const handleChange = (prop) => (event) => {
        setUser({...user, [prop]: event.target.value });
    };

    const handleSubmit = async () => {
        if(!user) {
            return;
        }

        const fullName = user.lastName + ' ' + user.firstName;
        const postData = {...user, fullName}

        // Call API
        try {
            const res = user.uRole === 'SV' ? await updateStudent(postData) : await updateManager(postData);

            if (res.data.status === 'success') {
                dispatch({type: "CURRENT_USER_INFO", payload: postData });
                localStorage.setItem('currentUser', JSON.stringify(postData));
                
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
        setUser(state.userInfo);
    }

    return (
        <InfoCard header={{ title: 'Thông tin cá nhân'}}>
            { alert && 
                <Alert severity={alert.type} sx={{ mb: 2 }}>
                    <a href={alert.destination} style={{ color: 'var(--color-dark-gray)', fontSize: '11'}} >{ alert.content }</a>
                </Alert> 
            }
            <Grid container xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* Last Name Field */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <TextField
                        value={user.lastName}
                        onChange={handleChange('lastName')}
                        required
                        label="Họ và tên lót"
                        id="input-lastName"
                        sx={{ width: '100%' }}
                    />
                </Grid>

                {/* First Name Field */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <TextField
                        value={user.firstName}
                        onChange={handleChange('firstName')}
                        required
                        label="Tên"
                        id="input-firstName"
                        sx={{ width: '100%' }}
                    />
                </Grid>

                {/* Student ID Field - Disabled */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <TextField
                        value={user.studentId || user.email.substring(0, 8)}
                        onChange={handleChange('studentId')}
                        label="Mã số sinh viên"
                        id="input-studentId"
                        sx={{ width: '100%' }}
                    />
                </Grid>

                {/* Email Field - Disabled */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <TextField
                        value={user.email}
                        disabled
                        label="Email"
                        id="input-email"
                        sx={{ width: '100%' }}
                    />
                </Grid>

                {/* Phone Number Field */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <TextField
                        value={user.phoneNumber}
                        onChange={handleChange('phoneNumber')}
                        label="Số điện thoại"
                        id="input-phone"
                        sx={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12}></Grid>

                {/* Date of Birth Field - Date Picker */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <TextField
                        value={moment(user.dateOfBirth).format('YYYY-MM-DD')}
                        onChange={handleChange('dateOfBirth')}
                        label="Ngày sinh"
                        id="input-dob"
                        type="date"
                        defaultValue={moment().format('YYYY-MM-DD')}
                        sx={{ width: '100%' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}></Grid>

                {/* Gender Field - Radio Group */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <FormControl component="fieldset" sx={{m: 1}}>
                        <FormLabel component="legend">Giới tính</FormLabel>
                        <RadioGroup row aria-label="gender" name="row-radio-gender-group" onChange={handleChange("gender")}>
                            <FormControlLabel value="Nam" checked={user.gender === 'Nam'} control={<Radio />} label="Nam" />
                            <FormControlLabel value="Nữ" checked={user.gender === 'Nữ'} control={<Radio />} label="Nữ" />
                            <FormControlLabel value="Khác" checked={user.gender === 'Khác'} control={<Radio />} label="Khác" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}></Grid>

                {/* Ethnic Group - Select */}
                <Grid item lg={6} xs={12} sx={{ p: 1}} >
                    <FormControl fullWidth>
                        <InputLabel id="ethnic-group">Dân tộc</InputLabel>
                        <Select
                            labelId="ethnic-group"
                            id="input-ethnicGroup"
                            value={user.ethnicGroup ? user.ethnicGroup : ethnicGroups[0]}
                            label="Dân tộc"
                            onChange={handleChange('ethnicGroup')}
                        >
                            { ethnicGroups.map((name) => (<MenuItem value={name}>{name}</MenuItem>)) }
                        </Select>
                    </FormControl>
                </Grid>
                
                {/* Address Field - Full Width */}
                <Grid item xs={12} sx={{ p: 1}} >
                    <FormControl fullWidth >
                        <InputLabel htmlFor="input-address">Địa chỉ</InputLabel>
                        <OutlinedInput
                            id="input-address"
                            value={user.address}
                            onChange={handleChange('address')}
                            label="Địa chỉ"
                        />
                    </FormControl>
                </Grid>

                {/* Ethnic Group - Select */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <FormControl fullWidth>
                        <InputLabel id="faculty-group">Khoa</InputLabel>
                        <Select
                            labelId="faculty-group"
                            id="input-faculty"
                            value={user.faculty ? user.faculty : faculties.find(f => f.fName === 'Khoa')}
                            label="Khoa"
                            onChange={handleChange('faculty')}
                        >
                            { faculties.map((f) => (<MenuItem value={f.fName}>{f.fName}</MenuItem>)) }
                        </Select>
                    </FormControl>
                </Grid>

                {/* Major Field */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <TextField
                            label="Chuyên ngành"
                            id="input-major"
                            value={user.major}
                            onChange={handleChange('major')}
                            sx={{ width: '100%' }}
                    />
                </Grid>

                {/* Class Field */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <TextField
                            label="Lớp"
                            id="input-class"
                            value={user.studentClass}
                            onChange={handleChange('studentClass')}
                            sx={{ width: '100%' }}
                    />
                </Grid>

                {/* Position Field */}
                <Grid item lg={6} xs={12} sx={{p: 1}} >
                    <TextField
                            label="Chức vụ"
                            id="input-position"
                            value={user.uPosition}
                            onChange={handleChange('uPosition')}
                            sx={{ width: '100%' }}
                    />
                </Grid>

                {/* Button Group */}
                <Grid xs={12} direction="row" container justifyContent="flex-end" sx={{ width: '100%', p: 1 }}>
                    <Button variant="text" onClick={handleCancel}>Hủy</Button>
                    <Button variant="contained" sx={{ ml:2 }} onClick={handleSubmit}>Lưu thay đổi</Button>
                </Grid>
            </Grid>
        </InfoCard>
    )
};

export default PersonalUpdateForm;