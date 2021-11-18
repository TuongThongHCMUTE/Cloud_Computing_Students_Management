import axios from 'axios';

const url = 'https://l82b5iv6fe.execute-api.ap-southeast-1.amazonaws.com/dev';

export const updateStudent = (user) => {

    const { updatedAt, id, ...sendData } = user;

    console.log("USER UPDATE: ", sendData);

    const option = {
        method: "put",
        url: `${url}/students/${sendData.email}`,
        data: sendData
    }

    return axios(option);
}