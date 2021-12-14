import React from 'react';
import moment from 'moment';

// material-ui import
import {
    Box,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// project's components import
import InfoCard from 'ui-component/cards/InfoCard';
import ThreeColInfoRecord from 'ui-component/info-record/ThreeColInfoRecord';

// =========================|| SCHOOL YEAR CARD  ||========================= //
const SchoolYearCard = (props) => {
    const { data, triggerDeleteSchoolYears, triggerOpenModal } = props;
    return (
        <InfoCard 
            sx={{ 
                width: "300px", 
                margin: "0 0 16px 16px",
                boxShadow: data.isShowed 
                    ? "0 0 5px 5px var(--color-light-blue)"
                    : "0 0 10px 2px var(--color-light-gray)" 
            }} 
            header={{ title: data.yName }}
        >
            <ThreeColInfoRecord 
                title="Bắt đầu" 
                value={moment(data.startDate).format("DD/MM/YYYY")} 
            />
            <ThreeColInfoRecord 
                title="Kết thúc" 
                value={moment(data.endDate).format("DD/MM/YYYY")} 
            />
            <ThreeColInfoRecord 
                title="Hiển thị" 
                value={data.isShowed ? "Hiển thị" : "Ẩn"} 
            />
            <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                borderTop: "1px solid rgba(144, 202, 249, 0.46)",
                margin: "0 -16px -16px",
            }}>
                <IconButton 
                    aria-label="delete" 
                    style={{ margin: "0 4px"}}
                    color="primary" 
                    onClick={() => triggerOpenModal(true, data.id)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton 
                    aria-label="delete" 
                    style={{ margin: "0 4px"}} 
                    color="error"
                    onClick={() => triggerDeleteSchoolYears(data.id)}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </InfoCard>
    )
}

export default SchoolYearCard;