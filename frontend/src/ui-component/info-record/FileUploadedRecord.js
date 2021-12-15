import React from 'react'

import { deleteFile } from 'apis/files';

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

    const getFileExtension = (file) => {
        const array = file.name.split('.');
        return array[array.length - 1];
    }

    return (
        <Grid className={classes.container} lg={6} sx={12}>
            <img src={fileImageConfig[getFileExtension(file)] || fileImageConfig['default']} alt="" />
            <div className={classes.info}>
                <a href={url + "/forms/proofs?key=" + file.filePath} target="_blank" rel="noreferrer">{file.name}</a>
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
