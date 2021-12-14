import React from 'react';
import moment from 'moment';

// project components imports
import InfoCard from 'ui-component/cards/InfoCard';
import ThreeColInfoRecord from 'ui-component/info-record/ThreeColInfoRecord';

const PersonalFullInfo = ({user}) => {

    return (
        <>
            <InfoCard header={{ title: 'Thông tin cá nhân'}}>
                <ThreeColInfoRecord title="Họ và tên" value={user.fullName} />
                <ThreeColInfoRecord title="Mã số sinh viên" value={user.studentId} />
                <ThreeColInfoRecord title="Email" value={user.email} />
                <ThreeColInfoRecord title="Số điện thoại" value={user.phoneNumber} />
                <ThreeColInfoRecord title="Ngày tháng năm sinh" value={moment(user.dateOfBirth).format("DD-MM-YYYY")} />
                <ThreeColInfoRecord title="Giới tính" value={user.gender} />
                <ThreeColInfoRecord title="Dân tộc" value={user.ethnicGroup} />
                <ThreeColInfoRecord title="Địa chỉ" value={user.address} />
            </InfoCard>
            <InfoCard header={{ title: 'Thông tin đơn vị'}}>
                <ThreeColInfoRecord title="Khoa" value={user.faculty} />
                <ThreeColInfoRecord title="Chuyên ngành" value={user.major} />
                <ThreeColInfoRecord title="Lớp" value={user.studentClass} />
                <ThreeColInfoRecord title="Chức vụ" value={user.uPosition} />
            </InfoCard>
        </>
    );
}

export default PersonalFullInfo;