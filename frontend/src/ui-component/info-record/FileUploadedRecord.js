import React from 'react'

import { deleteFile, getFile } from 'apis/files';

import classes from "./FileUploadedRecord.module.css";

import { fileImageConfig } from 'store/fileImageConfig';
import { url } from 'store/constant';

import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

const FileUploadedRecord = ({file, onDelete, allowDelete}) => {
    const handleClick = async () => {
        await deleteFile(file.filePath)
        onDelete()
    }

    const handleGetFile = async () => {
        const res = await getFile(file.filePath);
        if (res.data.status === 'success') {
            window.open(res.data.url, '_blank');
        }
    }

    const getFileExtension = (file) => {
        const array = file.name.split('.');
        return array[array.length - 1];
    }



    return (
        <Grid className={classes.container} lg={6} sx={12}>
            <img src={fileImageConfig[getFileExtension(file)] || fileImageConfig['default']} alt="" />
            <div className={classes.info} onClick={handleGetFile}>
                {/* <a href={url + "/files?fileKey=" + file.filePath} target="_blank" rel="noreferrer">{file.name}</a> */}
                {file.name}
            </div>
            { allowDelete &&
                <span 
                    className={classes.delBtn}
                    onClick={handleClick}
                >
                    <CloseIcon color="error"/>
                </span>
            }
        </Grid>
    )
}

export default FileUploadedRecord
