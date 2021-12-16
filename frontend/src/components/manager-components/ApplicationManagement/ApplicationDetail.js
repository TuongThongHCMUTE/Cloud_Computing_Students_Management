import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// apis
import { getStudentById } from 'apis/students';
import { getApplicationById, updateApplication } from 'apis/application';

// assets
import merits from 'assets/dummy-data/merits'

// store
import { gridSpacing } from 'store/constant';
import AppContext from 'store/AppContext';

// material-ui components imports
import { 
    Grid,
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
    Typography ,
    Backdrop,
    CircularProgress  
} from '@mui/material';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

// project components imports
import SecondaryCard from 'ui-component/cards/SecondaryCard';
import ApplicationInfoTabs from './ApplicationInfoTabs';

const actions = [
    { icon: <HomeWorkOutlinedIcon />, name: 'Cấp Liên chi hội' },
    { icon: <DomainOutlinedIcon />, name: 'Cấp Trường' },
    { icon: <HourglassEmptyOutlinedIcon />, name: 'Đang xem xét' },
    { icon: <CancelOutlinedIcon />, name: 'Không đạt' },
];

// ========================|| APPLICATION DETAIL  ||======================== //
const ApplicationDetail = () => {
    const { id } = useParams();
    const { state } = useContext(AppContext);
    const [ student, setStudent ] = useState(null);
    const [ application, setApplication ] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getApplication = async (id) => {
            const res = await getApplicationById(id);
            if (res.data.status === 'success') {
                const application = res.data.data;
                setApplication(application);
                return application;
            } else {
                return null;
            }
        } 

        const getStudent = async (id) => {
            const res = await getStudentById(id);
            if (res.data.status === 'success') {
                const student = res.data.data.student;
                setStudent(student);
            } else {
                return null;
            }
        } 

        console.log("id: ", id)
        setLoading(true);
        getApplication(id)
        .then((application) => getStudent(application.studentId))
        .then(() => setLoading(false));

    },[id])

    const handleDialActionClick = async (level) => {
        const res = await updateApplication({ 
            id: application.id, 
            expectedLevel: level 
        });
        if (res.data.status === 'success') {
            setApplication(prev => ({...prev, level: level}));
        }
    }

    return (
        <>
        <Grid container spacing={gridSpacing}>
            <Grid item xs={3}>
                <Link 
                    to='/manager/sub/applications' 
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '18px',
                        color: '#000'
                    }}
                >
                    <ArrowBackOutlinedIcon sx={{ marginRight: '8px'}} />
                    Trở lại
                </Link>
            </Grid>
            <Grid item xs={12}>
                { application && student && 
                    <SecondaryCard sx={{ padding: '16px 16px'}}>
                        <ApplicationInfoTabs 
                            role={state.userInfo.role} 
                            merits={merits}
                            application={application}
                            student={student}
                        />
                    </SecondaryCard>
                }
            </Grid>
        </Grid>
        <Grid item xs={12} height="64px"/>
        {application && student && 
        <Grid item xs={12} sx={{
            background: "#efefef",
            position: "fixed",
            bottom: 0,
            left: "20px",
            right: "20px",
            zIndex: 1,
            borderTop: "1px solid var(--color-medium-blue)"
        }}>
            <Typography sx={{
                float: "right",
                padding: "16px 30px",
                fontSize: "20px",
                fontWeight: "600"
            }}>
                {
                    "Kết quả: " 
                    + application.level
                }
            </Typography>
            <Typography sx={{
                float: "right",
                padding: "16px 30px",
                fontSize: "20px",
                fontWeight: "600"
            }}>
                {
                    "Họ và tên: " 
                    + student.name.lastName + " " + student.name.firstName 
                }
            </Typography>
        </Grid>}
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', top: "96px", right: "56px" }}
            direction='down'
            hidden={state.userInfo.role !== 'LCH'}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleDialActionClick(action.name)}
            />
            ))}
        </SpeedDial>
    </>
    )
}

export default ApplicationDetail
