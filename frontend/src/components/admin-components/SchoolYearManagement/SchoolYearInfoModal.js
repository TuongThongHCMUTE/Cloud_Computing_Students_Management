import React, { useState, useEffect } from 'react';
import moment from 'moment';

// apis
import { createSchoolYear, updateSchoolYear } from 'apis/schoolYear';

// material-ui import
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
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

// project's components import
import InfoCard from 'ui-component/cards/InfoCard';

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

const statuses = [{ name: 'Ẩn', value: false}, { name: 'Hiển thị', value: true}]

// ======================|| SCHOOL YEAR INFO MODAL  ||====================== //
export default function TransitionsModal(props) {
    const { 
        schoolYear, 
        isOpen, 
        isUpdate, 
        triggerUpdateSchoolYears, 
        triggerCloseModal 
    } = props

    const [open, setOpen] = useState(isOpen);
    const [alert, setAlert] = useState(null);
    const [schoolYearState, setSchoolYear] = useState(null);

    useEffect(() => {
        setSchoolYear(schoolYear)
    }, [schoolYear])

    const theme = useTheme();
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSchoolYear(null);
        setOpen(false);
        triggerCloseModal()
    }

    const handleChange = (prop) => (event) => {
        setSchoolYear({...schoolYearState, [prop]: event.target.value });
    };

    const handleSubmit = async () => {
        // Call API
        try {
            const res = isUpdate 
            ? await updateSchoolYear(schoolYearState) 
            : await createSchoolYear(schoolYearState)

            if (res.data.status === 'success') {
                triggerUpdateSchoolYears(schoolYearState);
                handleClose()
                
                setAlert({ 
                    type: 'success', 
                    content: 'Lưu thông tin thành công!' 
                });
                setTimeout(() => {
                    setAlert(null);
                }, 2000)
            } else {
                setAlert({ 
                    type: 'error', 
                    content: 'Đã xảy ra lỗi, vui lòng thử lại!' 
                });
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
                    <a 
                        href={alert.destination} 
                        style={{ color: 'var(--color-dark-gray)', fontSize: '11'}} 
                    >
                        { alert.content }
                    </a>
                </Alert> 
            }
            <Tooltip title="Thêm năm học">
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
                <InfoCard sx={style} header={{ title: 'Thông tin năm học'}}>
                    <IconButton 
                        aria-label="close" 
                        sx={{ position: 'absolute', right: 8, top: 8}}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Grid 
                        container 
                        xs={12} 
                        sx={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                        {/* Name Field */}
                        <Grid key="name" item lg={6} xs={12} sx={{p: 1}} >
                            <TextField
                                required
                                label="Tên năm học"
                                id="input-name"
                                value={schoolYearState ? schoolYearState.yName : ""}
                                onChange={handleChange('yName')}
                                sx={{ width: '100%' }}
                            />
                        </Grid>

                        {/* Status Group - Select */}
                        <Grid key="status" item lg={6} xs={12} sx={{ p: 1}} >
                            <FormControl fullWidth>
                                <InputLabel id="status-group">
                                    Trạng thái
                                </InputLabel>
                                <Select
                                    labelId="status-group"
                                    id="input-statusGroup"
                                    value={
                                        schoolYearState 
                                        ? schoolYearState.isShowed || statuses[0].value 
                                        : statuses[0].value
                                    }
                                    label="Trạng thái"
                                    onChange={handleChange('isShowed')}
                                >
                                    {statuses.map((status) => (
                                        <MenuItem value={status.value}>{status.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Start Date Field - Date Picker */}
                        <Grid item lg={6} xs={12} sx={{p: 1}} >
                            <TextField
                                value={
                                    schoolYearState 
                                    ? moment(schoolYearState.startDate).format('YYYY-MM-DD') 
                                    : moment().format('YYYY-MM-DD')
                                }
                                onChange={handleChange('startDate')}
                                label="Ngày bắt đầu"
                                id="input-dob"
                                type="date"
                                defaultValue={moment().format('YYYY-MM-DD')}
                                sx={{ width: '100%' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        {/* End Date Field - Date Picker */}
                        <Grid item lg={6} xs={12} sx={{p: 1}} >
                            <TextField
                                value={
                                    schoolYearState 
                                    ? moment(schoolYearState.endDate).format('YYYY-MM-DD') 
                                    : moment().format('YYYY-MM-DD')
                                }
                                onChange={handleChange('endDate')}
                                label="Ngày kết thúc"
                                id="input-dob"
                                type="date"
                                defaultValue={moment().format('YYYY-MM-DD')}
                                sx={{ width: '100%' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        {/* Description Field */}
                        <Grid key="description" item xs={12} sx={{p: 1}} >
                            <TextField
                                required
                                label="Mô tả"
                                id="input-description"
                                value={schoolYearState ? schoolYearState.description : ""}
                                onChange={handleChange('description')}
                                sx={{ width: '100%' }}
                            />
                        </Grid>

                        {/* Button Group */}
                        <Grid 
                            key="buttons" 
                            xs={12} 
                            direction="row" 
                            container 
                            justifyContent="flex-end" 
                            sx={{ width: '100%', p: 1 }}
                        >
                            <Button 
                                variant="text" 
                                onClick={handleClose}
                            >
                                Hủy
                            </Button>
                            <Button 
                                variant="contained" 
                                sx={{ ml:2 }} 
                                onClick={handleSubmit}
                            >
                                Lưu
                            </Button>
                        </Grid>
                    </Grid>
                </InfoCard>
            </Modal>
        </>
    );
}