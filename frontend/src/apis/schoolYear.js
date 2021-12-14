// use axios to call api
import axios from 'axios';

// backend url
import { url } from 'store/constant';

export const getAllSchoolYears = () => {
    const option = {
        method: "get",
        url: `${url}/schoolYears`
    }
    return axios(option);
}

export const getActiveSchoolYear = () => {
  const option = {
      method: "get",
      url: `${url}/schoolYears/active`
  }

  return axios(option);
}

export const createSchoolYear = (schoolYear) => {
  const option = {
      method: "post",
      url: `${url}/schoolYears`,
      data: schoolYear
  }

  return axios(option);
}

export const updateSchoolYear = (schoolYear) => {
  const { createAt, updatedAt, id, ...sendData } = schoolYear;

  const option = {
      method: "put",
      url: `${url}/schoolYears/${id}`,
      data: sendData
  }

  return axios(option);
}

export const deleteSchoolYear = (schoolYearId) => {
  const option = {
      method: "delete",
      url: `${url}/schoolYears/${schoolYearId}`
  }
  return axios(option);
}