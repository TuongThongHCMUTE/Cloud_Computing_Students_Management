// use axios to call api
import axios from 'axios';

// backend url
import { url } from 'store/constant';

// get all student's applications 
export const getAllApplications= () => {
    const option = {
        method: "get",
        url: `${url}/forms`,
    }
    return axios(option);
}

// get an application which has _id = id
export const getApplicationById= (id) => {
    const option = {
        method: "get",
        url: `${url}/forms/${id}`
    }
    return axios(option);
}

// get an application by filters
// filter is studentId and schoolYearId
export const getApplicationByFilter = async (filters) => {
    const { studentId, schoolYearId } = filters;

    const res = await getAllApplications();
    try {
        if (res.data.status === 'success') {      
            const applications = res.data.data;
            const filteredApplications = 
                applications.filter(a => a.schoolYearId === schoolYearId && a.studentId === studentId);
            if (filteredApplications.length > 0) {
                return applications[0];
            } else {
                createApplication(filters);
            }
        }
    } catch (err) {
        console.log(err)
    }
}

export const createApplication = (filters) => {
    const application = { ...filters, merits: [], level: 'Chưa bình xét'}
    const option = {
        method: "post",
        url: `${url}/forms`,
        data: application
    }
    return axios(option);
  }
  

// update application
export const updateApplication = (application) => {
    const { createAt, updatedAt, id, ...sendData } = application;
    const option = {
        method: "put",
        url: `${url}/forms/${id}`,
        data: sendData
    }
    return axios(option);
}