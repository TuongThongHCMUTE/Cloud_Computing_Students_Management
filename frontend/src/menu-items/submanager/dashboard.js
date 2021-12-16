// assets

import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

// constant
const icons = {
    EmojiEventsOutlinedIcon,
    EventNoteIcon,
    AccountTreeRoundedIcon,
    ListAltOutlinedIcon
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
    id: 'dashboard',
    title: 'Bình xét',
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
        // {
        //     id: 'school-year',
        //     title: 'Năm học',
        //     type: 'item',
        //     url: '/admin/school-year',
        //     icon: icons.EventNoteIcon,
        //     breadcrumbs: false
        // },
        {
            id: 'applications',
            title: 'Danh sách bình xét',
            type: 'item',
            url: '/manager/sub/applications',
            icon: icons.AccountTreeRoundedIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
