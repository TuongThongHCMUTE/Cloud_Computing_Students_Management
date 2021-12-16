import React, { useState, useEffect } from 'react';

// APIs
import { getAllStudents } from 'apis/students';
import { getAllApplications } from 'apis/application';
import { getActiveSchoolYear } from 'apis/schoolYear';

// store
import { gridSpacing } from 'store/constant';

// material-ui components imports
import {
    Grid,
    Alert,
    Backdrop,
    CircularProgress 
} from '@mui/material';

// project components imports
import Path from 'ui-component/Path';
import TableApplication from './TableApplication';
import PageNoData from 'ui-component/default-page/PageNodata';

const pages = ["Bình xét", "Duyệt hồ sơ"];

// ======================|| APPLICATION MANAGEMENT  ||====================== //
const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const getSchoolYear = async () => {
            const schoolYear = getActiveSchoolYear();
            console.log("schoolYear: ", schoolYear);
            return schoolYear ? schoolYear.id : null;
        }

        const listStudents =  async () => {
            try {    
                const response = await getAllStudents();
                const students = response.data.data;
        
                if(students.length > 0) {    
                    setStudents(students)
                }
            } catch (error) {
                setAlert({
                    type: 'error', 
                    content: error.response.data.message 
                });
                setTimeout(() => {
                    setAlert(null);
                }, 1000)
                setLoading(false)
            }
        };

        const listApplications =  async (year) => {
            try {    
                const response = await getAllApplications();
                const applications = response.data.data;
        
                if(applications.length > 0) {   
                    const filteredApplications = applications.filter(a => a.schoolYearId === year)   
                    setApplications(
                        filteredApplications
                    )
                }
            } catch (error) {
                setAlert({
                    type: 'error', 
                    content: error.response.data.message 
                });
                setTimeout(() => {
                    setAlert(null);
                }, 1000)
                setLoading(false)
            }
        };

        setLoading(true)
        listStudents()
        .then(() => getActiveSchoolYear())
        .then((year) => listApplications(year.id))
        .then(() => setLoading(false));
    }, []);

    const mapApplicationWithStudent = (students, applications) => {
        const newApplications = applications.filter(x => x.studentId != null)

        return newApplications.map(a => {
            const student = students.find(s => s.id === a.studentId);
            return {
                ...a,
                mssv: student.studentId,
                fullName: student.fullName,
                faculty: student.faculty,
                className: student.studentClass,
                email: student.email,
                phone: student.phoneNumber
            }
        })
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Path pages={pages} />
            </Grid>
            <Grid item xs={12}>
                { alert && 
                    <Alert severity={alert.type} sx={{ mb: 2 }}>
                        <a 
                            href={alert.destination} 
                            style={{ 
                                color: 'var(--color-dark-gray)', 
                                fontSize: '11'
                            }} 
                        >
                            { alert.content }
                        </a>
                    </Alert> 
                }
                <Backdrop
                    sx={{ 
                        color: '#fff', 
                        zIndex: (theme) => theme.zIndex.drawer + 1 
                    }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {(applications.length && students.length) 
                    ? 
                        <TableApplication 
                            data={mapApplicationWithStudent(students, applications)} 
                        /> 
                    : !loading && <PageNoData /> 
                }
            </Grid>
        </Grid>
    )
};

export default StudentManagement;