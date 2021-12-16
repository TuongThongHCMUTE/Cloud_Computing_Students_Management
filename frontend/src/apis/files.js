// use axios to call api
import axios from 'axios';
// backend url
import { url } from 'store/constant';

const { uploadFileS3 } = require('./s3');

export const uploadFile = async (file, folder) => {
    try {
        const result = await uploadFileS3(file, folder)

        return {
            status: 'success',
            message: 'Upload file thành công',
            data: {
                displayName: file.originalname,
                imageKey: result.Key
            }
        }

    } catch (err) {
        console.log("error: ", err)
        return {
            status: 'fail',
            message: 'Lỗi khi upload file',
        }
    }
}

export const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const option = {
        method: "post",
        url: `${url}/auth/me/avatar`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    }

    return axios(option);
}

export const deleteFile = async (key) => {
    const token = localStorage.getItem("token");
    const option = {
        method: "delete",
        url: `${url}/files`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            key: key
        }
    }
    return axios(option);
}