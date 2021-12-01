// assets
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

// constant
const icons = {
    ListOutlinedIcon,
    EmojiEventsOutlinedIcon
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'honors',
            title: 'Tuyên dương',
            type: 'item',
            url: '/dashboard/tuyen-duong',
            icon: icons.EmojiEventsOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'submitted-list',
            title: 'Danh sách bình xét',
            type: 'item',
            url: '/dashboard/danh-sach-binh-xet',
            icon: icons.ListOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
