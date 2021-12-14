// assets
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

// constant
const icons = {
    AccountBoxOutlinedIcon,
    ApartmentIcon,
    ManageAccountsIcon,
    SupervisorAccountIcon,
    AccountCircleIcon,
    AccountTreeRoundedIcon
};

// ===========================|| UTILITIES MENU ITEMS ||=========================== //

const info = {
    id: 'account',
    title: 'Tài khoản',
    type: 'group',
    children: [
        {
            id: 'personal-info',
            title: 'Thông tin cá nhân',
            type: 'item',
            url: '/info/personal-info',
            icon: icons.AccountBoxOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'faculty',
            title: 'Danh sách đơn vị',
            type: 'item',
            url: '/admin/faculties',
            icon: icons.AccountTreeRoundedIcon,
            breadcrumbs: false
        },
        {
            id: 'student-association',
            title: 'Hội sinh viên',
            type: 'item',
            url: '/admin/student-association',
            icon: icons.ApartmentIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'faculty-student-association',
        //     title: 'Liên chi hội',
        //     type: 'item',
        //     url: '/admin/faculty-student-association',
        //     icon: icons.ManageAccountsIcon,
        //     breadcrumbs: false
        // },
        {
            id: 'student',
            title: 'Sinh viên',
            type: 'item',
            url: '/admin/students',
            icon: icons.SupervisorAccountIcon,
            breadcrumbs: false
        }
    ]
};

export default info;
