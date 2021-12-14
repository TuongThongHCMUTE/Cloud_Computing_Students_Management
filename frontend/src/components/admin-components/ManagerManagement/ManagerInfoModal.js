import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
    Backdrop,
    Modal,
    Tooltip,
    Fab,
    Grid,
    TextField,
    Alert,
    Button,
    IconButton,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    FormControlLabel,
    InputLabel, 
    MenuItem,
    Select,
    OutlinedInput,
    Switch,
    Stack,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// icons
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import InfoCard from 'ui-component/cards/InfoCard';

// APIs
import { createManager, updateManager } from 'apis/managers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  minWidth:'300px',
  maxHeight: '95%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function TransitionsModal(props) {
    const { manager, faculties, isOpen, isUpdate, triggerUpdateManagers, triggerCloseModal } = props;

    const ethnicGroups = ['Dân tộc', 'Kinh', 'Hoa', 'Khmer'];

    const [open, setOpen] = useState(isOpen);
    const [alert, setAlert] = useState(null);
    const [managerState, setManager] = useState();

    useEffect(() => {
        if (manager) {
            setManager(manager)
        }
    }, [manager])

    const theme = useTheme();
  
    const handleOpen = () => setOpen(true);
    const handleClose = (resetState = true) => {
        if(resetState) {
            setManager();
        }
        setOpen(false);
        triggerCloseModal()
    }

    const handleChange = (prop) => (event) => {
        setManager({...managerState, [prop]: event.target.value });
    };

    const handleSubmit = async (resetPassword=false) => {
        if(!managerState) {
            return;
        }

        // Call API
        try {
            const fullName = managerState.lastName + ' ' + managerState.firstName;
            const postData = resetPassword 
            ? {...managerState, password: '12345678'} 
            : {...managerState, fullName: fullName}

            const res = isUpdate ? await updateManager(postData) : await createManager(postData)

            if (res.data.status === 'success') {
                setAlert( { type: 'success', content: 'Lưu thông tin thành công!' });
                triggerUpdateManagers(postData);
                handleClose()
                
                setTimeout(() => {
                    setAlert(null);
                }, 2000)
            } else {
                setAlert( { type: 'error', content: 'Đã xảy ra lỗi, vui lòng thử lại!' });
                handleClose(false);
                setTimeout(() => {
                    setAlert(null);
                }, 2000)
            }

        } catch (err) {
            setAlert( { type: 'error', content: err.response.data.message });
            handleClose(false);
            setTimeout(() => {
                setAlert(null);
            }, 2000)
        }
    } 

    return (
        <>
            { alert && 
                <Alert severity={alert.type} sx={{ ml: 3, mt: 2 }}>
                    <a href={alert.destination} style={{ color: 'var(--color-dark-gray)', fontSize: '11'}} >{ alert.content }</a>
                </Alert> 
            }
            <Tooltip title="Thêm quản lý">
                <Fab
                    component="div"
                    onClick={handleOpen}
                    size="medium"
                    variant="string"
                    color="primary"
                    sx={{
                        bottom: 16,
                        position: 'fixed',
                        right: 36,
                        zIndex: (theme) => theme.zIndex.speedDial,
                        boxShadow: theme.shadows[8]
                    }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen || open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <InfoCard sx={style} header={{ title: 'Thông tin sinh viên'}}>
                    <IconButton 
                        aria-label="close" 
                        sx={{ position: 'absolute', right: 8, top: 8}}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Grid container xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* Is Actived Field */}
                    <Grid item lg={6} xs={12} sx={{p: 1}} >
                        <Stack direction="row" sx={{ alignItems: "center" }}>
                            <Typography>Khóa</Typography>
                            <Switch
                                label="Kích hoạt"
                                checked={managerState ? managerState.isActived : false}
                                onChange={(event) => {setManager({ ...managerState, isActived: event.target.checked })}}
                            />
                            <Typography>Kích hoạt</Typography>
                        </Stack>
                    </Grid>
                    <Grid item lg={6} xs={12} sx={{p: 1, display: 'flex', justifyContent: 'flex-end'}} >
                        <Button 
                            variant="outlined" 
                            startIcon={<CachedIcon />}
                            onClick={() => {
                                if( isUpdate ) {
                                    handleSubmit(true)
                                }
                            }}
                            >
                            Reset Password
                        </Button>
                    </Grid>

                    {/* Last Name Field */}
                    <Grid item lg={6} xs={12} sx={{p: 1}} >
                        <TextField
                            value={managerState ? managerState.lastName : ''}
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
                            value={managerState ? managerState.firstName : ''}
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
                            value={managerState ? managerState.studentId : ''}
                            onChange={handleChange('studentId')}
                            label="Mã số sinh viên"
                            id="input-studentId"
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    {/* Email Field - Disabled */}
                    <Grid item lg={6} xs={12} sx={{p: 1}} >
                        <TextField
                            value={managerState ? managerState.email : ''}
                            onChange={handleChange('email')}
                            required
                            disabled={isUpdate}
                            label="Email"
                            id="input-email"
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    {/* Phone Number Field */}
                    <Grid item lg={6} xs={12} sx={{p: 1}} >
                        <TextField
                            value={managerState ? managerState.phoneNumber : ''}
                            onChange={handleChange('phoneNumber')}
                            label="Số điện thoại"
                            id="input-phone"
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    {/* Date of Birth Field - Date Picker */}
                    <Grid item lg={6} xs={12} sx={{p: 1}} >
                        <TextField
                            value={managerState ? moment(managerState.dateOfBirth).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}
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
                    {/* Ethnic Group - Select */}
                    <Grid item lg={6} xs={12} sx={{ p: 1}} >
                        <FormControl fullWidth>
                            <InputLabel id="ethnic-group">Dân tộc</InputLabel>
                            <Select
                                labelId="ethnic-group"
                                id="input-ethnicGroup"
                                value={managerState ? managerState.ethnicGroup : ethnicGroups[0]}
                                label="Dân tộc"
                                onChange={handleChange('ethnicGroup')}
                            >
                                { ethnicGroups.map((name) => (<MenuItem value={name}>{name}</MenuItem>)) }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}></Grid>

                    {/* Gender Field - Radio Group */}
                    <Grid item lg={6} xs={12} sx={{p: 1}} >
                        <FormControl component="fieldset" sx={{m: 1}}>
                            <FormLabel component="legend">Giới tính</FormLabel>
                            <RadioGroup row aria-label="gender" name="row-radio-gender-group" onChange={handleChange("gender")}>
                                <FormControlLabel value="Nam" checked={managerState ? managerState.gender === 'Nam' : false} control={<Radio />} label="Nam" />
                                <FormControlLabel value="Nữ" checked={managerState ? managerState.gender === 'Nữ' : false} control={<Radio />} label="Nữ" />
                                <FormControlLabel value="Khác" checked={managerState ? managerState.gender === 'Khác' : false} control={<Radio />} label="Khác" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}></Grid>
                    
                    {/* Address Field - Full Width */}
                    <Grid item xs={12} sx={{ p: 1}} >
                        <FormControl fullWidth >
                            <InputLabel htmlFor="input-address">Địa chỉ</InputLabel>
                            <OutlinedInput
                                id="input-address"
                                value={managerState ? managerState.address : ''}
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
                                value={managerState ? managerState.faculty : faculties.find(f => f.fName === 'Khoa')}
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
                                value={managerState? managerState.major : ''}
                                onChange={handleChange('major')}
                                sx={{ width: '100%' }}
                        />
                    </Grid>

                    {/* Class Field */}
                    <Grid item lg={6} xs={12} sx={{p: 1}} >
                        <TextField
                                label="Lớp"
                                id="input-class"
                                value={managerState ? managerState.studentClass : ''}
                                onChange={handleChange('studentClass')}
                                sx={{ width: '100%' }}
                        />
                    </Grid>

                    {/* Position Field */}
                    <Grid item lg={6} xs={12} sx={{p: 1}} >
                        <TextField
                            label="Chức vụ"
                            id="input-position"
                            value={managerState? managerState.uPosition : ''}
                            onChange={handleChange('uPosition')}
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                        {/* Button Group */}
                        <Grid key="buttons" xs={12} direction="row" container justifyContent="flex-end" sx={{ width: '100%', p: 1 }}>
                            <Button variant="text" onClick={handleClose}>Hủy</Button>
                            <Button variant="contained" sx={{ ml:2 }} onClick={() => handleSubmit(false)}>Lưu</Button>
                        </Grid>
                    </Grid>
                </InfoCard>
        </Modal>
        </>
  );
}