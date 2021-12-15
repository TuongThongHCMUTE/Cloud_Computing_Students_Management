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

export const getActiveSchoolYear = async() => {
  const res = await getAllSchoolYears();
  if (res.data.status === 'success') {
    const schoolyears = res.data.data;
    const activedSchoolYears = 
      schoolyears.filter(y => y.isShowed === true).sort((y1, y2) => y2.endDate - y1.endDate);
    if (activedSchoolYears.length > 0) {
      return activedSchoolYears[0];
    } else {
      return null;
    }
  }
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