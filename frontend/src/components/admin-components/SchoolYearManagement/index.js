import React, { useState, useEffect } from 'react';

// APIs
import { getAllSchoolYears, deleteSchoolYear } from 'apis/schoolYear';

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
import SchoolYearCard from './SchoolYearCard';
import SchoolYearInfoModal from './SchoolYearInfoModal';

const pages = ["Bình xét", "Năm học"];

// =========================|| MERIT MANAGEMENT  ||========================= //
const SchoolYearManagement = () => {
    const [schoolYears, setSchoolYears] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [schoolYearWillUpdate, setSchoolYearWillUpdate] = useState(null);
    const [alert, setAlert] = useState(null);

    const listSchoolYears =  async () => {
        setLoading(true);
        try {    
            const response = await getAllSchoolYears();
            const schoolYears = response.data.data;
    
            if(schoolYears.length > 0) {         
                setSchoolYears(schoolYears)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listSchoolYears().then(() => setLoading(false));
    }, [update]);

    const handleOpenModal = (isOpen, schoolYearId) => {
        setOpenModal(isOpen);
        setUpdate(true);
        setSchoolYearWillUpdate(schoolYears.find(y => y.id === schoolYearId));
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setUpdate(false);
        setSchoolYearWillUpdate(null);
    }

    const handleUpdateSchoolYear= () => {
        setLoading(true)
        listSchoolYears().then(() => {
            setLoading(false);
            setUpdate(false);
            setSchoolYearWillUpdate(null);
        })
    } 

    const handleDeleteSchoolYear = async (schoolYearId) => {
        try {
            const res = await deleteSchoolYear(schoolYearId)

            if (res.data.status === 'success') {
                const newSchoolYears = schoolYears.filter(f => 
                    f.id !== schoolYearId
                );
                setSchoolYears(newSchoolYears);
                
                setAlert({ 
                    type: 'success', 
                    content: 'Xóa thành công!' 
                });
                setTimeout(() => {
                    setAlert(null);
                }, 1000)
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
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Path pages={pages} />
            </Grid>
            <Backdrop
                sx={{ 
                    color: '#fff', 
                    zIndex: (theme) => theme.zIndex.drawer + 1 
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid xs={12}>
                <SchoolYearInfoModal 
                    triggerUpdateSchoolYears={handleUpdateSchoolYear} 
                    triggerCloseModal={handleCloseModal}
                    isOpen={openModal}
                    isUpdate={update}
                    schoolYear={schoolYearWillUpdate} 
                />
            </Grid>
            <Grid xs={12}>
                { alert && 
                    <Alert severity={alert.type} sx={{ mb: 2 }}>
                        <a 
                            href={alert.destination} 
                            style={{ 
                                color: 'var(--color-dark-gray)', 
                                fontSize: '11'
                            }} 
                        >
                            {alert.content}
                        </a>
                    </Alert> 
                }
            </Grid>
            <Grid 
                item 
                xs={12} 
                sx={{ 
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 0 0 -16px"
                }}
            >
                {schoolYears.map(y => 
                    <SchoolYearCard 
                        data={y}
                        triggerDeleteSchoolYears={handleDeleteSchoolYear}
                        triggerOpenModal={handleOpenModal} 
                    />)}
            </Grid>
        </Grid>
    )
};

export default SchoolYearManagement;