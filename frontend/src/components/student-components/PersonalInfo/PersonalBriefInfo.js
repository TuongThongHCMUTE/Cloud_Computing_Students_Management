import React from 'react';

// assets
import MarkunreadIcon from '@mui/icons-material/Markunread';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';

// project components imports
import InfoCard from 'ui-component/cards/InfoCard';
import IconInfoRecord from 'ui-component/info-record/IconInfoRecord';

const PersonalBriefInfo = ({ user }) => {
    return (
        <InfoCard header={{ title: user.fullName, subTitle: user.studentId, image: user.avatar }}>
            <IconInfoRecord title="Email" value={user.email} icon={<MarkunreadIcon/>} />
            <IconInfoRecord title="Số điện thoại" value={user.phoneNumber} icon={<PhoneIcon/>} />
            <IconInfoRecord title="Khoa" value={user.faculty} icon={<HomeIcon/>} />
        </InfoCard>
    );
}

export default PersonalBriefInfo;