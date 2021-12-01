import React, { useState, useEffect } from 'react';

// APIs
import { getAllFaculties, deleteFaculty } from 'apis/faculties';

// material-ui components imports
import {
    Grid,
    Alert
} from '@mui/material';

// project components imports
import { gridSpacing } from 'store/constant';
import Path from 'ui-component/Path';

import TableFaculties from './TableFaculties';
import FacultyInfoModal from './FacultyInfoModal';

const FacultyManagement = () => {
    const [faculties, setFaculties] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const [update, setUpdate] = useState(false);
    const [facultyWillUpdate, setFacultyWillUpdate] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const listFaculties =  async () => {
            try {    
                const response = await getAllFaculties();
                const faculties = response.data.data;
        
                if(faculties.length > 0) {         
                    setFaculties(faculties)
                }
            } catch (error) {
                console.log(error);
            }
        };

        listFaculties();
    }, [update]);

    const pages = ["Quản lý danh sách đơn vị"];

    const handleOpenModal = (isOpen, facultyId) => {
        setOpenModal(isOpen);
        setUpdate(true);
        setFacultyWillUpdate(faculties.find(f => f.id === facultyId));
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setUpdate(false);
        setFacultyWillUpdate(null);
    }

    const handleUpdateFaculty= (faculty) => {
        const index = faculties.findIndex(f => f.id === faculty.id);

        if (faculty.id === undefined || index === -1 ) {
            setFaculties([...faculties, faculty]);
        } else {
            setFaculties((prev) => {
                const newState = prev;
                newState[index] = faculty;
                return newState;
            })
        }
        setUpdate(false);
        setFacultyWillUpdate(null);
    } 

    const handleDeleteFaculty = async (facultyId) => {
        try {
            const res = await deleteFaculty(facultyId)
    
            if (res.data.status === 'success') {
                setAlert( { type: 'success', content: 'Xóa thành công!' });

                const newFaculties = faculties.filter(f => f.id !== facultyId);
                setFaculties(newFaculties);
                
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
            setAlert( { type: 'error', content: err.response.data.message });
            setTimeout(() => {
                setAlert(null);
            }, 2000)
        }
    }

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Path pages={pages} />
                </Grid>
                <Grid xs={12}>
                    <FacultyInfoModal 
                        triggerUpdateFaculties={handleUpdateFaculty} 
                        triggerCloseModal={handleCloseModal}
                        isOpen={openModal}
                        isUpdate={update}
                        faculty={facultyWillUpdate} 
                    />
                </Grid>
                <Grid item xs={12}>
                    { alert && 
                        <Alert severity={alert.type} sx={{ mb: 2 }}>
                            <a href={alert.destination} style={{ color: 'var(--color-dark-gray)', fontSize: '11'}} >{alert.content}</a>
                        </Alert> 
                    }
                    <TableFaculties 
                        triggerDeleteFaculties={handleDeleteFaculty} 
                        triggerOpenModal={handleOpenModal}
                        data={faculties} 
                    />
                </Grid>
            </Grid>
        </>
    )
};

export default FacultyManagement;