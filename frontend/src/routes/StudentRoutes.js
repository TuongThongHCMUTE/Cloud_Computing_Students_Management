import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
const Honors = 
    Loadable(lazy(() => import('components/student-components/Honors')));
const StudentNotification = 
    Loadable(lazy(() => import('components/student-components/StudentNotification')));
const PersonalInfo = 
    Loadable(lazy(() => import('components/student-components/PersonalInfo')));
const EthicMandatory = 
    Loadable(lazy(() => import('components/student-components/EthicCriteria/EthicMandatory')));
const EthicOthers = 
    Loadable(lazy(() => import('components/student-components/EthicCriteria/EthicOthers')));
const VolunteerMandatory = 
    Loadable(lazy(() => import('components/student-components/VolunteerCriteria/VolunteerMandatory')));
const VolunteerOthers = 
    Loadable(lazy(() => import('components/student-components/VolunteerCriteria/VolunteerOthers')));
const LearningMandatory = 
    Loadable(lazy(() => import('components/student-components/LearningCriteria/LearningMandatory')));
const LearningOthers = 
    Loadable(lazy(() => import('components/student-components/LearningCriteria/LearningOthers')));
const HealthMandatory = 
    Loadable(lazy(() => import('components/student-components/HealthCriteria/HealthMandatory')));
const IntegrationLanguages = 
    Loadable(lazy(() => import('components/student-components/IntegrationCriteria/IntegrationLanguages')));
const IntegrationSkills = 
    Loadable(lazy(() => import('components/student-components/IntegrationCriteria/IntegrationSkills')));
const IntegrationActivities = 
    Loadable(lazy(() => import('components/student-components/IntegrationCriteria/IntegrationActivities')));
const OtherCriteria = 
    Loadable(lazy(() => import('components/student-components/OtherCriteria')));
const MeritManagement = 
    Loadable(lazy(() => import('components/admin-components/MeritManagement')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ===========================|| MAIN ROUTING ||=========================== //

const StudentRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/merits',
            element: <MeritManagement />
        },
        {
            path: '/dashboard/tuyen-duong',
            element: <Honors />
        },
        {
            path: '/info/personal-info',
            element: <PersonalInfo />
        },
        {
            path: '/info/ethic/mandatory',
            element: <EthicMandatory />
        },
        {
            path: '/info/ethic/others',
            element: <EthicOthers />
        },
        {
            path: '/info/learning/mandatory',
            element: <LearningMandatory />
        },
        {
            path: '/info/learning/others',
            element: <LearningOthers />
        },
        {
            path: '/info/health',
            element: <HealthMandatory />
        },
        {
            path: '/info/volunteer/mandatory',
            element: <VolunteerMandatory />
        },
        {
            path: '/info/volunteer/others',
            element: <VolunteerOthers />
        },
        {
            path: '/info/integration/foreign-languages',
            element: <IntegrationLanguages />
        },
        {
            path: '/info/integration/skills',
            element: <IntegrationSkills />
        },
        {
            path: '/info/integration/activities',
            element: <IntegrationActivities />
        },
        {
            path: '/info/other-criterias',
            element: <OtherCriteria />
        },
        {
            path: '/other/thong-bao',
            element: <StudentNotification />
        }
    ]
};

export default StudentRoutes;
