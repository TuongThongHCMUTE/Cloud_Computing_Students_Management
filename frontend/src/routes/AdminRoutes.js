import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import StudentManagement from 'components/admin-components/StudentManagement';
import ManagerManagement from 'components/admin-components/ManagerManagement';
import FacultyManagement from 'components/admin-components/FacultyManagement';
import SchoolYearManagement from 'components/admin-components/SchoolYearManagement';

const AdminRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/admin/school-year',
            element: <SchoolYearManagement />
        },
        {
            path: '/admin/faculties',
            element: <FacultyManagement />
        },
        {
            path: '/admin/students',
            element: <StudentManagement />
        },
        {
            path: '/admin/student-association',
            element: <ManagerManagement />
        }
    ]
};

export default AdminRoutes;