import axios from 'axios';

const url = 'https://l82b5iv6fe.execute-api.ap-southeast-1.amazonaws.com/dev';

export const getAllStudents = () => {
    const option = {
        method: "get",
        url: `${url}/students`
    }
    return axios(option);
}

export const createStudent = (student) => {  
    const option = {
        method: "post",
        url: `${url}/students`,
        data: {
            ...student, 
            uRole: 'SV',
            isActived: student.isActived || false, 
            password: '123456'},
    };
    return axios(option);
}

export const updateStudent = (student) => {
    const { updatedAt, id, ...sendData } = student;
    const option = {
        method: "put",
        url: `${url}/students/${student.email}`,
        data: sendData
    }
    return axios(option);
}

export const deleteStudent = (studentId) => {
    const option = {
        method: "delete",
        url: `${url}/students/${studentId}`,
    }
  
    return axios(option);
  }