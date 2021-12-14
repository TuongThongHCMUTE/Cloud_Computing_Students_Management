import React, { useState, useEffect } from 'react';

// APIs
import { getAllManagers, deleteManager } from 'apis/managers';
import { getAllFaculties } from 'apis/faculties';

// material-ui components imports
import {
    Grid,
    Alert,
    Backdrop,
    CircularProgress 
} from '@mui/material';

// project components imports
import { gridSpacing } from 'store/constant';
import Path from 'ui-component/Path';

import TableManager from './TableManagers';
import ManagerInfoModal from './ManagerInfoModal';

const ManagerManagement = () => {
    const [managers, setManagers] = useState([]);
    const [faculties, setFaculties] = useState([])

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [managerWillUpdate, setManagerWillUpdate] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const listManagers =  async () => {
            try {    
                const response = await getAllManagers();
                const managers = response.data.data;
        
                if(managers.length > 0) {         
                    setManagers(managers.filter(m => m.uRole === 'HSV'))
                }
            } catch (error) {
                console.log(error);
            }
        };

        setLoading(true)
        listManagers().then(() => setLoading(false));
    }, [update]);

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

    const pages = ["Quản lý danh sách Hội sinh viên"];

    const handleOpenModal = (isOpen, managerId) => {
        setOpenModal(isOpen);
        setUpdate(true);
        setManagerWillUpdate(managers.find(m => m.id === managerId));
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setUpdate(false);
        setManagerWillUpdate(null);
    }

    const handleUpdateManager= (manager) => {
        const index = managers.findIndex(m => m.id === manager.id);
        if (index === -1 ) {
            setManagers([...managers, manager]);
        } else {
            setManagers((prev) => {
                const newState = prev;
                newState[index] = manager;
                return newState;
            })
        }
        setUpdate(false);
        setManagerWillUpdate(null);
    } 

    const handleDeleteManager = async (managerId) => {
        try {
            const res = await deleteManager(managerId)
    
            if (res.data.status === 'success') {
                setAlert( { type: 'success', content: 'Xóa thành công!' });

                const newManagers = managers.filter(m => m.id !== managerId);
                setManagers(newManagers);
                
                setTimeout(() => {
                    setAlert(null);
                }, 1000)
            } else {
                setAlert( { type: 'error', content: 'Đã xảy ra lỗi, vui lòng thử lại!' });
                setTimeout(() => {
                    setAlert(null);
                }, 2000)
            }
    
        } catch (err) {
            setAlert( { type: 'error', content: err });
            setTimeout(() => {
                setAlert(null);
            }, 2000)
        }
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Path pages={pages} />
            </Grid>
            <Grid xs={12}>
                <ManagerInfoModal 
                    triggerUpdateManagers={handleUpdateManager} 
                    triggerCloseModal={handleCloseModal}
                    isOpen={openModal}
                    isUpdate={update}
                    manager={managerWillUpdate} 
                    faculties={faculties}
                />
            </Grid>
            <Grid item xs={12}>
                { alert && 
                    <Alert severity={alert.type} sx={{ mb: 2 }}>
                        <a href={alert.destination} style={{ color: 'var(--color-dark-gray)', fontSize: '11'}} >{ alert.content }</a>
                    </Alert> 
                }
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <TableManager 
                    triggerDeleteManagers={handleDeleteManager} 
                    triggerOpenModal={handleOpenModal}
                    data={managers} 
                    faculties={faculties}
                />
            </Grid>
        </Grid>
    )
};

export default ManagerManagement;