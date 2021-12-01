import axios from 'axios';

const url = 'https://l82b5iv6fe.execute-api.ap-southeast-1.amazonaws.com/dev';

export const updateStudent = (user) => {

    const { updatedAt, id, ...sendData } = user;

    const option = {
        method: "put",
        url: `${url}/students/${sendData.id}`,
        data: sendData
    }

    return axios(option);
}

export const getAllStudents = () => {
    const option = {
        method: "get",
        url: `${url}/students`
    }

    return axios(option);
}

export const createStudent = (student) => {  
    console.log('post data: ', student)
    const option = {
        method: "post",
        url: `${url}/students`,
        data: {
            ...student, 
            uRole: 'SV',
            isActived: true, 
            password: '123456'},
    };
  
    return axios(option);
}

export const deleteStudent = (studentId) => {
    const option = {
        method: "delete",
        url: `${url}/students/${studentId}`,
    }
  
    return axios(option);
  }