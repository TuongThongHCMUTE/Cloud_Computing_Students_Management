import axios from 'axios';

const url = 'https://l82b5iv6fe.execute-api.ap-southeast-1.amazonaws.com/dev';

export const getAllManagers = () => {
    const option = {
        method: "get",
        url: `${url}/managers`
    }
    return axios(option);
}

export const createManager = (manager) => {  
    const option = {
        method: "post",
        url: `${url}/managers`,
        data: {
            ...manager, 
            uRole: 'HSV',
            isActived: manager.isActived || false, 
            password: '12345678'},
    };
    return axios(option);
}

export const updateManager = (manager) => {
    const { createAt, updatedAt, id, ...sendData } = manager;
    const option = {
        method: "put",
        url: `${url}/managers/${manager.email}`,
        data: sendData
    }
    return axios(option);
}

export const deleteManager = (managerId) => {
    const option = {
        method: "delete",
        url: `${url}/managers/${managerId}`,
    }
    return axios(option);
  }