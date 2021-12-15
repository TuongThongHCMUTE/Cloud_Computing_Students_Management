import React, { useState, useEffect } from 'react';

// APIs
import { getAllStudents, deleteStudent } from 'apis/students';
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

import TableStudent from './TableStudents';
import StudentInfoModal from './StudentInfoModal';

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [faculties, setFaculties] = useState([])

    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [studentWillUpdate, setStudentWillUpdate] = useState(null);
    const [alert, setAlert] = useState(null);

    const listStudents =  async () => {
        setLoading(true)
        try {    
            const response = await getAllStudents();
            const students = response.data.data;
    
            if(students.length > 0) {         
                setStudents(students)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listStudents().then(() => setLoading(false));
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

    const pages = ["Quản lý danh sách sinh viên"];

    const handleOpenModal = (isOpen, studentId) => {
        setOpenModal(isOpen);
        setUpdate(true);
        setStudentWillUpdate(students.find(s => s.id === studentId));
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setUpdate(false);
        setStudentWillUpdate(null);
    }

    const handleUpdateStudent= (student) => {
        listStudents().then(() => {
            setLoading(false);
            setUpdate(false);
            setStudentWillUpdate(null);
        });
    } 

    const handleDeleteStudent = async (studentId) => {
        try {
            const res = await deleteStudent(studentId)
    
            if (res.data.status === 'success') {
                setAlert( { type: 'success', content: 'Xóa thành công!' });

                const newStudents = students.filter(s => s.id !== studentId);
                setStudents(newStudents);
                
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

    console.log("students: ", students)

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Path pages={pages} />
            </Grid>
            <Grid xs={12}>
                <StudentInfoModal 
                    triggerUpdateStudents={handleUpdateStudent} 
                    triggerCloseModal={handleCloseModal}
                    isOpen={openModal}
                    isUpdate={update}
                    student={studentWillUpdate} 
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
                <TableStudent 
                    triggerDeleteStudents={handleDeleteStudent} 
                    triggerOpenModal={handleOpenModal}
                    data={students} 
                    faculties={faculties}
                />
            </Grid>
        </Grid>
    )
};

export default StudentManagement;