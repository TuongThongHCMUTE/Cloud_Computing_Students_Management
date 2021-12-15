import React, { useState, useRef } from 'react';

import {
    Backdrop,
    Modal,
    Grid,
    IconButton,
    CircularProgress,
    Alert 
} from '@mui/material';

// apis
import { uploadFile } from 'apis/files';

// styles
import './index.css';

// icons
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';

// images
import { fileImageConfig } from 'store/fileImageConfig';
import uploadImg from 'assets/images/cloud-upload-regular-240.png';

// project's components import
import InfoCard from 'ui-component/cards/InfoCard';
import { ConsoleView } from 'react-device-detect';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    minWidth:'300px',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

// ========================|| UPLOAD FILE MODAL ||========================== //
export default function UploadFileModal(props) {
    const { isOpen, triggerCloseModal } = props

    const wrapperRef = useRef(null);

    const [open, setOpen] = useState(isOpen);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFiles = e.target.files;
        if (newFiles.length) {
            const updatedList = [...files, ...newFiles];
            setFiles(updatedList);
        }
    }
  
    const handleClose = () => {
        triggerCloseModal(uploadedFiles)
        setFiles([]);
        setUploadedFiles([]);
        setOpen(false);
    }

    const handleRemoveFile = (file) => {
        const updatedList = [...files];
        updatedList.splice(files.indexOf(file), 1);
        setFiles(updatedList);
    }

    const handleUploadFile = async (file) => {
        try {
            setLoading(true)

            console.log("file: ", file);

            getBase64(file)
            .then(result => {
                    console.log("call api")
                    uploadFile({
                        fileName: file.name,
                        file: result
                    })
                    .then(res => {
                        if (res.data.status === 'success') {
                            setUploadedFiles((prev) => [...prev, {
                                name: file.name, 
                                filePath: res.data.data.imageKey
                            }])
            
                            setFiles(prevFiles => prevFiles.filter(f => f !== file))
                            
                            setAlert({ 
                                type: 'success', 
                                content: 'Upload file thành công!' 
                            });
                            setTimeout(() => {
                                setAlert(null);
                            }, 1000)
                            setLoading(false)
                        } else {
                            setAlert({ 
                                type: 'error', 
                                content: 'Đã xảy ra lỗi, vui lòng thử lại!' 
                            });
                            setTimeout(() => {
                                setAlert(null);
                            }, 1000)
                            setLoading(false)
                        }
                    });
                }
            )
            .catch(err => {
              console.log(err);
            });
        } catch (err) {
            setAlert({ 
                type: 'error', 
                content: err.response.data.message 
            });
            setTimeout(() => {
                setAlert(null);
            }, 1000)
            setLoading(false)
        }
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen || open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <InfoCard 
                    sx={style} 
                    header={{ title: 'Upload minh chứng (định dạng pdf/png/jpg/jpeg)'}}
                >
                    { alert && 
                        <Alert 
                            variant="filled" 
                            severity={alert.type} 
                            sx={{ mb: 2 }}
                        >
                            <a 
                                href={alert.destination} 
                                style={{ 
                                    color: 'var(--color-dark-gray)', 
                                    fontSize: '11'
                                }} 
                            >
                                {alert.content}
                            </a>
                        </Alert> 
                    }
                    <IconButton 
                        aria-label="close" 
                        sx={{ position: 'absolute', right: 8, top: 8}}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Grid container sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div
                            ref={wrapperRef}
                            className="drop-file-input"
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                        >
                            <div className="drop-file-input__label">
                                <img src={uploadImg} alt="" />
                                <p>
                                    Kéo thả file vào đây, hoặc click để chọn file
                                </p>
                            </div>
                            <input 
                                type="file" 
                                multiple="multiple" 
                                value="" 
                                onChange={onFileDrop}
                            />
                        </div>
                        {
                            files.length > 0 ? (
                                <div className="drop-file-preview">
                                    <p className="drop-file-preview__title">
                                        File của bạn:
                                    </p>
                                    <div className="drop-file-preview__list">
                                        {
                                            files.map((item, index) => (
                                                <div 
                                                    key={index} 
                                                    className="drop-file-preview__item"
                                                >
                                                    <img 
                                                        src={fileImageConfig[item.type.split('/')[1]] || fileImageConfig['default']} 
                                                        alt="" 
                                                    />
                                                    <div className="drop-file-preview__item__info">
                                                        <p>{item.name}</p>
                                                        <p>{(item.size/1024).toFixed()} kB</p>
                                                    </div>
                                                    <span 
                                                        className="drop-file-preview__item__up" 
                                                        onClick={() => handleUploadFile(item)}
                                                    >
                                                        <FileUploadIcon color="primary"/>
                                                    </span>
                                                    <span 
                                                        className="drop-file-preview__item__del" 
                                                        onClick={() => handleRemoveFile(item)}
                                                    >
                                                        <CloseIcon color="error"/>
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div> 
                            ) : null
                        }
                    </Grid>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </InfoCard>
            </Modal>
        </>
    );
}