import React from 'react';

// project imports
import MainLayout from 'layout/MainLayout';

import StudentManagement from 'components/admin-components/StudentManagement';
import MeritManagement from 'components/admin-components/MeritManagement';
import ApplicationManagement from 'components/manager-components/ApplicationManagement';
import ApplicationDetail from 'components/manager-components/ApplicationManagement/ApplicationDetail';

const SubManagerRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/merits',
            element: <MeritManagement />
        },
        {
            path: '/manager/sub/applications',
            element: <ApplicationManagement />
        },
        {
            path: '/manager/sub/applications/:id',
            element: <ApplicationDetail />
        },
        {
            path: '/manager/sub/students',
            element: <StudentManagement />
        },
    ]
};

export default SubManagerRoutes;