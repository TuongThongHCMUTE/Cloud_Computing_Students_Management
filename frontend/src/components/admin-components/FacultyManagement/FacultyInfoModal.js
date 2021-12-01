import React, { useState, useEffect } from 'react';

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
    FormControl,
    InputLabel, 
    MenuItem,
    Select
} from '@mui/material';

// icons
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useTheme } from '@mui/material/styles';
import InfoCard from 'ui-component/cards/InfoCard';
import { createFaculty, updateFaculty } from 'apis/faculties';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  minWidth:'300px',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const types = [{ name: 'Chưa phân loại', value: 'undefined'}, { name: 'Hội sinh viên', value: 'HSV'}];
const statuses = [{ name: 'Ẩn', value: false}, { name: 'Hiển thị', value: true}]

export default function TransitionsModal(props) {
    const { faculty, isOpen, isUpdate, triggerUpdateFaculties, triggerCloseModal } = props

    const [open, setOpen] = useState(isOpen);
    const [alert, setAlert] = useState(null);
    const [facultyState, setFaculty] = useState(null);

    useEffect(() => {
        setFaculty(faculty)
    }, [faculty])

    const theme = useTheme();
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFaculty(null);
        setOpen(false);
        triggerCloseModal()
    }

    const handleChange = (prop) => (event) => {
    setFaculty({...facultyState, [prop]: event.target.value });
};

const handleSubmit = async () => {
    // Call API
    try {
        const res = isUpdate ? await updateFaculty(facultyState) : await createFaculty(facultyState)

        if (res.data.status === 'success') {
            setAlert( { type: 'success', content: 'Lưu thông tin thành công!' });
            triggerUpdateFaculties(facultyState);
            handleClose()
            
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

  return (
    <>
        { alert && 
            <Alert severity={alert.type} sx={{ ml: 3, mt: 2 }}>
                <a href={alert.destination} style={{ color: 'var(--color-dark-gray)', fontSize: '11'}} >{ alert.content }</a>
            </Alert> 
        }
        <Tooltip title="Thêm đơn vị">
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
            <InfoCard sx={style} header={{ title: 'Thông tin đơn vị'}}>
                <IconButton 
                    aria-label="close" 
                    sx={{ position: 'absolute', right: 8, top: 8}}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <Grid container xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* Name Field */}
                    <Grid key="name" item xs={12} sx={{p: 1}} >
                        <TextField
                            required
                            label="Tên đơn vị"
                            id="input-name"
                            value={facultyState ? facultyState.fName : ""}
                            onChange={handleChange('fName')}
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    {/* Email Field */}
                    <Grid key="email" item lg={6} xs={12} sx={{p: 1}} >
                        <TextField
                            required
                            label="Email"
                            id="input-email"
                            value={facultyState ? facultyState.email : ""}
                            onChange={handleChange('email')}
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    {/* Phone Number Field */}
                    <Grid key="phone" item lg={6} xs={12} sx={{p: 1}} >
                        <TextField
                            required
                            label="Số điện thoại"
                            id="input-phone"
                            value={facultyState ? facultyState.phoneNumber : ""}
                            onChange={handleChange('phoneNumber')}
                            sx={{ width: '100%' }}
                        />
                    </Grid>

                    {/* Type Group - Select */}
                    <Grid key="type" item lg={6} xs={12} sx={{ p: 1}} >
                        <FormControl fullWidth>
                            <InputLabel id="type-group">Phân loại</InputLabel>
                            <Select
                                labelId="type-group"
                                id="input-typeGroup"
                                value={facultyState ? facultyState.fType || types[0].value : types[0].value}
                                label="Phân loại"
                                onChange={handleChange('fType')}
                            >
                                { types.map((type) => (<MenuItem value={type.value}>{type.name}</MenuItem>)) }
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Status Group - Select */}
                    <Grid key="status" item lg={6} xs={12} sx={{ p: 1}} >
                        <FormControl fullWidth>
                            <InputLabel id="status-group">Trạng thái</InputLabel>
                            <Select
                                labelId="status-group"
                                id="input-statusGroup"
                                value={facultyState ? facultyState.isDisplayed || statuses[0].value : statuses[0].value}
                                label="Phân loại"
                                onChange={handleChange('isDisplayed')}
                            >
                                { statuses.map((status) => (<MenuItem value={status.value}>{status.name}</MenuItem>)) }
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Button Group */}
                    <Grid key="buttons" xs={12} direction="row" container justifyContent="flex-end" sx={{ width: '100%', p: 1 }}>
                        <Button variant="text" onClick={handleClose}>Hủy</Button>
                        <Button variant="contained" sx={{ ml:2 }} onClick={handleSubmit}>Lưu</Button>
                    </Grid>

                </Grid>
            </InfoCard>
      </Modal>
    </>
  );
}