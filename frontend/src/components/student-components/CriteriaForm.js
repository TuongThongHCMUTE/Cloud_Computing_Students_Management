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
import { 
    getApplicationById,
    getApplicationByFilter, 
    updateApplication 
} from 'apis/application';

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

    const setUserApplication = async (year) => {
        if (!year) {
            setApplication(null);
            setMerits([]);
            setLoading(false);
            return;
        }

        const user = state.userInfo;
        const filters = { studentId: user.id, schoolYearId: year.id }

        try {
            // Get student's application
            const application = await getApplicationByFilter(filters);
            console.log("application", application)
            if (application) {
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

    useEffect(() => {    
        setLoading(true);
        getActiveSchoolYear()
        .then((year) => setUserApplication(year))
        .then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUpdateApplication = async (showAlert, newMerits) => {
        try {
            const res = await updateApplication({ 
                ...application, 
                merits: newMerits 
            });
            
            if (res.data.status === 'success') {
                setLoading(true);
                const newApplicationRes = await getApplicationById(application.id);
                const newApplicationForm = newApplicationRes.data.data;
                setLoading(false);
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
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {application
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
                    !loading && <PageTimeOut />
            }
        </>
    )
}

export default CriteriaForm
