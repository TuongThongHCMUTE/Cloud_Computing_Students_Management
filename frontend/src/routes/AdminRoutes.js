import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import StudentManagement from 'components/admin-components/StudentManagement';
import FacultyManagement from 'components/admin-components/FacultyManagement';
const SchoolYear = Loadable(lazy(() => import('components/admin-components/SchoolYear')));
//const StudentManagement = Loadable(lazy(() => import('components/admin-components/StudentManagement')));

const AdminRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/admin/school-year',
            element: <SchoolYear />
        },
        {
            path: '/admin/faculties',
            element: <FacultyManagement />
        },
        {
            path: '/admin/students',
            element: <StudentManagement />
        },
    ]
};

export default AdminRoutes;