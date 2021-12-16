import React, { useState, useEffect } from 'react'

// APIs
import { getAllStudents } from 'apis/students';
import { getAllApplications } from 'apis/application';
import { getActiveSchoolYear } from 'apis/schoolYear';

// mui components imports
// material-ui components imports
import {
    Grid,
    Alert,
    Backdrop,
    CircularProgress 
} from '@mui/material';

// project components imports
import PageNoData from 'ui-component/default-page/PageNodata';
import Path from 'ui-component/Path';
import HonorCard from './HonorCard';

// Set current path
const pages = ["Tuyên dương"];

const Honors = () => {
    const [students, setStudents] = useState([]);
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
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

                console.log("application: ", applications)
                console.log("year: ", year)
        
                if(applications.length > 0) {         
                    setApplications(
                        applications.filter(a => a.schoolYearId === year)
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
        const newApplications = applications.filter(x => 
            x.studentId != null &&
            ( x.expectedLevel === 'Cấp Liên chi hội' || x.expectedLevel === 'Cấp Trường' )
        )

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

    const honorsList = mapApplicationWithStudent(students, applications);

    return (
        <Grid container spacing={3}>
            {/* Path section */}
            <Grid item xs={12}>
                <Path pages={pages} />
            </Grid>
            {/* Content section */}
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
            <Grid container ml={3} >
                {
                    (honorsList.length) 
                    ? 
                        honorsList.map(h => (
                            <Grid item lg={3} md={6} xs={12} sx={{ padding: "0 16px"}}>
                                <HonorCard data={h} />
                            </Grid>
                        ))
                    : !loading && 
                        <Grid item xs={12} mt={3}>
                            <PageNoData />
                        </Grid> 
                }
            </Grid>
        </Grid>
    )
}

export default Honors
