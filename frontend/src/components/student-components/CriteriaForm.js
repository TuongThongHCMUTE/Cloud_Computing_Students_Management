import React, { useState, useContext, useEffect } from 'react'
import CriteriaItem from './CriteriaItem'

import { 
    Button, 
    Grid, 
    Stack, 
    Snackbar,    
    Backdrop,
    CircularProgress,
    Alert 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

// context
import AppContext from 'store/AppContext';

// APIs
import { getActiveSchoolYear } from 'apis/schoolYear';
import { getApplicationByFilter, updateApplication } from 'apis/application';

// project's components import
import PageTimeOut from 'ui-component/default-page/PageTimeOut';

// ==========================|| CRITERIA FORM  ||=========================== //
const CriteriaForm = ({ criterias }) => {
    const [application, setApplication] = useState(null);
    const [merits, setMerits] = useState([]);
    const [inputValue, setInputValue] = useState({});
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const { state } = useContext(AppContext);

    useEffect(() => {
        const getNearestActivedYear =  async () => {
            try {    
                const response = await getActiveSchoolYear();
                const schoolYears = response.data.data.schoolYear;

                return schoolYears;
            } catch (error) {
                console.log(error);
            }
        };
    
        const setUserApplication = async (year) => {
            if (!year) {
                setApplication(null);
                setMerits([]);
                setLoading(false);
                return;
            }

            const user = state.userInfo;
            const filters = { studentId: user._id, schoolYear: year._id }

            try {
                // Get student's application
                const res =  await getApplicationByFilter(filters);
                if (res.data.status === 'success') {
                    const application = res.data.data.form;

                    setApplication(application)
                    setMerits(application.merits)
                }
            } catch (err) {
                setApplication(null);
                setMerits([]);
                setLoading(false);
                console.error(err);
            }
        }

        setLoading(true);
        getNearestActivedYear()
        .then((year) => setUserApplication(year))
        .then(() => setLoading(false));
    }, [state.userInfo])

    const handleUpdateApplication = async (showAlert, newMerits) => {
        try {
            const res = await updateApplication({ 
                ...application, 
                merits: newMerits 
            });
            
            if (res.data.status === 'success') {
                const newApplicationForm = res.data.data.form;
                setApplication(newApplicationForm)
                setMerits(newApplicationForm.merits);

                if (showAlert) {
                    setAlert([{ 
                        type: 'success', 
                        content: 'Lưu thông tin thành công!' 
                    }]);
                    setTimeout(() => {
                        setAlert(null);
                    }, 2000)
                }
            } else {
                setAlert([{ 
                    type: 'error', 
                    content: 'Đã xảy ra lỗi, vui lòng thử lại!' 
                }]);
                setTimeout(() => {
                    setAlert(null);
                }, 2000)
            }
        } catch (err) {
            setAlert([{ 
                type: 'error', content: err.response.data.message 
            }]);
            setTimeout(() => {
                setAlert(null);
            }, 2000)
        }
    }

    const handleChange = (event, id) => {
        const index = merits.findIndex(m => m.meritId === id);
        if (index === -1 ) {
            setMerits([
                ...merits, 
                { meritId: id, content: event.target.value, proofs: []}
            ]);
        } else {
            setMerits((prev) => {
                const newState = prev;
                newState[index].content = event.target.value;
                return newState;
            })
        }
        setInputValue({ ...inputValue, [id]: event.target.value})
    }

    const handleUploadFiles = async (files, id) => {
        const index = merits.findIndex(m => m.meritId === id);
        if (index === -1 ) {
            const newMerits = [
                ...merits, 
                { meritId: id, content: '', proofs: files}
            ];
            await setMerits(newMerits);
            handleUpdateApplication(false, newMerits);
        } else {
            const newMerits = merits;
            newMerits[index].proofs = files;
            await setMerits(newMerits);
            handleUpdateApplication(false, newMerits);
        }      
    }

    const handleSubmit = async () => {
        handleUpdateApplication(true, merits);
    }
 
    const criteriaItems = criterias.map(item => {

        const merit = merits.find(m => m.meritId === item.id);
        return (
            <Grid item xs={12}>
                <CriteriaItem 
                    key={item.id}
                    meritId={item.id}
                    proofs={merit ? merit.proofs : []}
                    title={item.content} 
                    value={merit ? merit.content : ''}
                    onChange={(event) => handleChange(event, item.id)}
                    onUploaded={(files) => handleUploadFiles(files, item.id)}
                />
            </Grid>
        )
    })
    
    return (
        application
            ? <Grid xs={12} container >
                    { alert &&
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            {alert.map(a => (
                                <Snackbar 
                                    open={alert.length} 
                                    autoHideDuration={2000}
                                >
                                    <Alert 
                                        severity={a.type} 
                                        variant="filled" 
                                        sx={{ ml: 3, mt: 2 }}
                                    >
                                        <a 
                                            href={a.destination} 
                                            style={{ 
                                                color: 'var(--color-dark-gray)', 
                                                fontSize: '11'
                                            }} 
                                        >
                                            { a.content }
                                        </a>
                                    </Alert> 
                                </Snackbar>
                            ))}
                        </Stack>
                    }

                    { criteriaItems }
                    <Grid item xs={12} height="64px"/>
                    <Grid item xs={12} sx={{
                        background: "#efefef",
                        position: "fixed",
                        bottom: 0,
                        left: "20px",
                        right: "20px",
                        zIndex: 1,
                        borderTop: "1px solid var(--color-medium-blue)"
                    }}>
                        <Button 
                            startIcon={<SaveIcon />} 
                            variant="contained"         
                            size="large"
                            sx={{ float: 'right', m: '12px 20px'}}
                            onClick={handleSubmit}
                        >
                            LƯU HỒ SƠ
                        </Button>
                    </Grid>
                </Grid>
            : 
            <>
                <Backdrop
                        sx={{ 
                            color: '#fff', 
                            zIndex: (theme) => theme.zIndex.drawer + 1 
                        }}
                        open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {!loading && <PageTimeOut />}
            </>
    )
}

export default CriteriaForm
