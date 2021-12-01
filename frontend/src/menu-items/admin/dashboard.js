// assets

import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';

// constant
const icons = {
    EmojiEventsOutlinedIcon,
    EventNoteIcon
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
            url: '/admin/merit',
            icon: icons.EmojiEventsOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'school-year',
            title: 'Năm học',
            type: 'item',
            url: '/admin/school-year',
            icon: icons.EventNoteIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
