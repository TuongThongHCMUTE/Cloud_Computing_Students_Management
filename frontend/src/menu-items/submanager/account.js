// assets
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// constant
const icons = {
    AccountBoxOutlinedIcon,
    ApartmentIcon,
    ManageAccountsIcon,
    SupervisorAccountIcon,
    AccountCircleIcon
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
            id: 'students',
            title: 'Sinh viên',
            type: 'item',
            url: '/manager/sub/students',
            icon: icons.SupervisorAccountIcon,
            breadcrumbs: false
        }
    ]
};

export default info;
