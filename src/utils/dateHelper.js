import { handleError } from "../handlers/handleError";

export const getDay = (scheduleInfo) => {
  try {

    return scheduleInfo?.day?.slice(8) || scheduleInfo.slice(8)
  } catch ({ message }) {
    handleError("getDay", message)
  }
};

export const getHour = (scheduleInfo) => {
  try {

    return scheduleInfo.schedule || scheduleInfo;
  } catch ({ message }) {
    handleError("getHour", message)
  }
};

export const getMonth = (scheduleInfo) => {
  try {

    const [year, month] = scheduleInfo?.day?.split('-') || scheduleInfo.split('-')
    return month;

  } catch ({ message }) {
    handleError("getMonth", message)
  }
};

export const getYear = (scheduleInfo) => {
  try {

    return scheduleInfo?.day?.slice(0, 4) || scheduleInfo.slice(0, 4)
  } catch ({ message }) {
    handleError("getYear", message)
  }
};

export const getProfessional = (scheduleInfo) => {
  try {

    return scheduleInfo.professional || scheduleInfo;
  } catch ({ message }) {
    handleError("getProfessional", message)
  }
};
