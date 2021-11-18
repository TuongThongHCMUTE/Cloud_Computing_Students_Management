import { useRoutes } from 'react-router-dom';

// routes
import HomeRoutes from './HomeRoutes';
import StudentRoutes from './StudentRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    return useRoutes([HomeRoutes, StudentRoutes, AuthenticationRoutes]);
}
