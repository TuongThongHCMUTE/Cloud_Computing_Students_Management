import axios from 'axios';

const url = 'https://l82b5iv6fe.execute-api.ap-southeast-1.amazonaws.com/dev/';

export const getAllFaculties = () => {
    const option = {
        method: "get",
        url: `${url}/facultys`
    }

    return axios(option);
}

export const createFaculty = (faculty) => {
    const token = localStorage.getItem("token");

    const option = {
        method: "post",
        url: `${url}/facultys`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: faculty
    }

    return axios(option);
}

export const updateFaculty = (faculty) => {
    console.log("Fac: ", faculty)
    const { updatedAt, id, ...sendData } = faculty;

    const option = {
        method: "put",
        url: `${url}/facultys/${id}`,
        data: sendData
    }

    console.log("UPDATE FAC OPTION: ", option)

    return axios(option);
}

export const deleteFaculty = (facultyId) => {
    const token = localStorage.getItem("token");

    const option = {
        method: "delete",
        url: `${url}/facultys/${facultyId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    return axios(option);
}