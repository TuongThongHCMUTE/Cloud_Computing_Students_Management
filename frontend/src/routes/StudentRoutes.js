import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PersonalInfo from '../components/student-components/PersonalInfo';
import EthicMandatory from '../components/student-components/EthicCriteria/EthicMandatory';
import EthicOthers from 'components/student-components/EthicCriteria/EthicOthers';
import VolunteerMandatory from 'components/student-components/VolunteerCriteria/VolunteerMandatory';
import VolunteerOthers from 'components/student-components/VolunteerCriteria/VolunteerOthers';
import LearningMandatory from 'components/student-components/LearningCriteria/LearningMandatory';
import LearningOthers from 'components/student-components/LearningCriteria/LearningOthers';
import HealthMandatory from 'components/student-components/HealthCriteria/HealthMandatory';
import IntegrationLanguages from 'components/student-components/IntegrationCriteria/IntegrationLanguages';
import IntegrationSkills from 'components/student-components/IntegrationCriteria/IntegrationSkills';
import IntegrationActivities from 'components/student-components/IntegrationCriteria/IntegrationActivities';
import OtherCriteria from 'components/student-components/OtherCriteria';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ===========================|| MAIN ROUTING ||=========================== //

const StudentRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/home',
            element: <PersonalInfo />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
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
        }
    ]
};

export default StudentRoutes;
