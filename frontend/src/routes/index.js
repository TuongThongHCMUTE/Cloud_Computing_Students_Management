import { useRoutes } from 'react-router-dom';

// routes
import HomeRoutes from './HomeRoutes';
import StudentRoutes from './StudentRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import AdminRoutes from './AdminRoutes';
import SubManagerRoutes from './SubManagerRoutes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    return useRoutes([
        HomeRoutes, 
        AuthenticationRoutes, 
        StudentRoutes, 
        AdminRoutes,
        SubManagerRoutes
    ]);
}
