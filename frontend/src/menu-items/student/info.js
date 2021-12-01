// assets
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

// constant
const icons = {
    AccountBoxOutlinedIcon,
    FavoriteBorderOutlinedIcon,
    SchoolOutlinedIcon,
    AccessibilityNewOutlinedIcon,
    SpaOutlinedIcon,
    PublicOutlinedIcon,
    DashboardCustomizeOutlinedIcon
};

// ===========================|| UTILITIES MENU ITEMS ||=========================== //

const info = {
    id: 'info',
    title: 'Hồ sơ',
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
            id: 'ethic-criteria',
            title: 'Tiêu chí đạo đức',
            type: 'collapse',
            icon: icons.FavoriteBorderOutlinedIcon,
            children: [
                {
                    id: 'ethic-mandatory',
                    title: 'Tiêu chuẩn bắt buộc',
                    type: 'item',
                    url: '/info/ethic/mandatory',
                    breadcrumbs: false
                },
                {
                    id: 'ethic-others',
                    title: 'Tiêu chuẩn khác',
                    type: 'item',
                    url: '/info/ethic/others',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'learning-criteria',
            title: 'Tiêu chí học tập',
            type: 'collapse',
            icon: icons.SchoolOutlinedIcon,
            children: [
                {
                    id: 'learning-mandatory',
                    title: 'Tiêu chuẩn bắt buộc',
                    type: 'item',
                    url: '/info/learning/mandatory',
                    breadcrumbs: false
                },
                {
                    id: 'learning-others',
                    title: 'Tiêu chuẩn khác',
                    type: 'item',
                    url: '/info/learning/others',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'health-criteria',
            title: 'Tiêu chí sức khỏe',
            type: 'item',
            url: '/info/health',
            icon: icons.AccessibilityNewOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'volunteer-criteria',
            title: 'Tiêu chí tình nguyện',
            type: 'collapse',
            icon: icons.SpaOutlinedIcon,
            children: [
                {
                    id: 'volunteer-mandatory',
                    title: 'Tiêu chuẩn bắt buộc',
                    type: 'item',
                    url: '/info/volunteer/mandatory',
                    breadcrumbs: false
                },
                {
                    id: 'volunteer-others',
                    title: 'Tiêu chuẩn khác',
                    type: 'item',
                    url: '/info/volunteer/others',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'integration-criteria',
            title: 'Tiêu chí hội nhập',
            type: 'collapse',
            icon: icons.PublicOutlinedIcon,
            children: [
                {
                    id: 'integration-foreign-languages',
                    title: 'Ngoại ngữ',
                    type: 'item',
                    url: '/info/integration/foreign-languages',
                    breadcrumbs: false
                },
                {
                    id: 'integration-skills',
                    title: 'Kỹ năng',
                    type: 'item',
                    url: '/info/integration/skills',
                    breadcrumbs: false
                },
                {
                    id: 'integration-activities',
                    title: 'Hoạt động hội nhập',
                    type: 'item',
                    url: '/info/integration/activities',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'other-criterias',
            title: 'Tiêu chuẩn khác',
            type: 'item',
            url: '/info/other-criterias',
            icon: icons.DashboardCustomizeOutlinedIcon,
            breadcrumbs: false
        },
    ]
};

export default info;
