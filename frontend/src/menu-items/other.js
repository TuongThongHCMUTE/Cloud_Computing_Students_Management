// assets
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';

// constant
const icons = {
    SmsFailedOutlinedIcon
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const other = {
    id: 'other',
    title: 'Khác',
    type: 'group',
    children: [
        {
            id: 'notifications',
            title: 'Thông báo',
            type: 'item',
            url: '/other/thong-bao',
            icon: icons.SmsFailedOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default other;
