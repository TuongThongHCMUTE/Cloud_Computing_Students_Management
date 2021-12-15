// use axios to call api
import axios from 'axios';

// backend url
import { url } from 'store/constant';

export const uploadFile = (file) => {
    const token = localStorage.getItem("token");
    
    const formData = new FormData();
    formData.append("file", file);

    const option = {
        method: "post",
        url: `${url}/forms/proofs`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    }
    return axios(option);
}

export const uploadAvatar = (file) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("avatar", file);

    const option = {
        method: "post",
        url: `${url}/auth/me/avatar`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    }

    return axios(option);
}

export const deleteFile = (key) => {
    const token = localStorage.getItem("token");
    const option = {
        method: "delete",
        url: `${url}/forms/proofs`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            key: key
        }
    }
    return axios(option);
}