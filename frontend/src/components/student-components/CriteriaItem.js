import React, { useState, useEffect } from 'react'

// apis
import { deleteFile } from 'apis/files';

// material-ui import
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// project's components import
import InfoCard from 'ui-component/cards/InfoCard'
import FileUploadedRecord from 'ui-component/info-record/FileUploadedRecord';
import UploadFileModal from './UploadFileModal';

// ==========================|| CRITERIA FORM  ||=========================== //
const CriteriaItem = ({meritId, title, value, proofs, onChange, onUploaded }) => {
    
    const [openUploadModal, setOpenUploadModal] = useState(false)
    const [proofsState, setProofs] = useState([]);

    useEffect(() => {
        setProofs(proofs);
    }, [proofs])
    

    const handleUploadFileClick = () => {
        setOpenUploadModal(prevState => !prevState);
    }

    const handleDeleteFileClick = async (p) => {
        const res = await deleteFile(p.filePath);

        if (res.data.status === 'success') {
            const newProofs = proofsState.filter(proof => proof !== p);
            setProofs(newProofs);
            onUploaded(newProofs);
        }
    }

    const handleCloseModal = (files) => {
        const newProofs = [...proofsState, ...files];
        onUploaded(newProofs);
        setProofs(newProofs);
        setOpenUploadModal(false);
    }

    return (  
        <InfoCard header={{ title: title }}>
            <TextField
                id="outlined-textarea"
                label="Thành tích"
                placeholder="Nhập thành tích của bạn"
                multiline
                sx={{ width: '100%' }}
                value={value}
                onChange={onChange}
            />
            {proofsState && proofsState.map(p => 
                <FileUploadedRecord 
                    file={p} 
                    allowDelete={true}
                    onDelete={() => handleDeleteFileClick(p)} 
                />
            )}
            <Button 
                variant="outlined" 
                sx={{ mt: '16px'}}
                onClick={handleUploadFileClick}
            >
                Thêm minh chứng
            </Button>
            <UploadFileModal
                meritId={meritId}
                isOpen={openUploadModal} 
                triggerCloseModal={handleCloseModal}
            />
        </InfoCard>
    )
}

export default CriteriaItem
