import React from 'react'
import InfoCard from 'ui-component/cards/InfoCard'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FileUploadedRecord from 'ui-component/info-record/FileUploadedRecord';

const CriteriaItem = ({title}) => {
    return (  
        <InfoCard header={{ title: title }}>
            <TextField
                id="outlined-textarea"
                label="Thành tích"
                placeholder="Nhập thành tích của bạn"
                multiline
                sx={{ width: '100%' }}
            />
            <FileUploadedRecord />
            <Button variant="outlined" sx={{ mt: '16px'}}>Upload minh chứng</Button>
        </InfoCard>
    )
}

export default CriteriaItem
