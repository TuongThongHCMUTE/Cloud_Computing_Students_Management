// assets
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


// constant
const icons = {
    ListOutlinedIcon,
    EmojiEventsOutlinedIcon,
    ListAltOutlinedIcon
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'merits',
            title: 'Tiêu chí',
            type: 'item',
            url: '/merits',
            icon: icons.ListAltOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'honors',
            title: 'Tuyên dương',
            type: 'item',
            url: '/dashboard/tuyen-duong',
            icon: icons.EmojiEventsOutlinedIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'submitted-list',
        //     title: 'Danh sách bình xét',
        //     type: 'item',
        //     url: '/dashboard/danh-sach-binh-xet',
        //     icon: icons.ListOutlinedIcon,
        //     breadcrumbs: false
        // }
    ]
};

export default dashboard;
