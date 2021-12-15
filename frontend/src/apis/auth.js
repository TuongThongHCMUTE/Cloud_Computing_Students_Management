import axios from 'axios';

// backend url
import { url } from 'store/constant';

export const login = (userInput) => {
    const option = {
        method: "post",
        url: `${url}/auth/login`,
        data: userInput,
    };
    //console.log("API POST DATA: ", userInput)
    return axios(option);
}

export const register = (userInput) => {
    const option = {
        method: "post",
        url: `${url}/auth/register`,
        data: userInput,
    };

    return axios(option);
}

export const getCurrentUser = () => {
    const token = localStorage.getItem("token");

    const option = {
        method: "get",
        url: `${url}/auth`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    return axios(option);
}

export const getCurrentUserInfo = () => {
    const token = localStorage.getItem("token");

    const option = {
        method: "get",
        url: `${url}/auth/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    return axios(option);
}

export const updateCurrentUserInfo = (user) => {
    const token = localStorage.getItem("token");

    const option = {
        method: "put",
        url: `${url}/auth/me`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: user
    }

    return axios(option);
}

export const changePassword = (oldPassword, newPassword, reNewPassword) => {
    const token = localStorage.getItem("token");

    const option = {
        method: "put",
        url: `${url}/auth/change-password`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { oldPassword, newPassword, reNewPassword }
    }

    return axios(option);
}