// use axios to call api
import axios from 'axios';

// backend url
import { url } from 'store/constant';

export const uploadFile = (file) => {

    const option = {
        method: "post",
        url: `${url}/files`,
        data: file
    }
    try {
        const res = axios(option);
        console.log("res: ", res)
    } catch (err) {
        console.log("error: ", err)
    }
}

export const uploadAvatar = (file) => {

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