import { handleError } from "../handlers/handleError";

export const getDay = (scheduleInfo, setSomethingWrong) => {
  try {

    return scheduleInfo?.day?.slice(8) || scheduleInfo.slice(8)
  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getDay", message)
  }
};

export const getHour = (scheduleInfo) => {
  try {

    return scheduleInfo.schedule || scheduleInfo;
  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getHour", message)
  }
};

export const getMonth = (scheduleInfo) => {
  try {

    const [year, month] = scheduleInfo?.day?.split('-') || scheduleInfo.split('-')
    return month;

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getMonth", message)
  }
};

export const getYear = (scheduleInfo) => {
  try {

    return scheduleInfo?.day?.slice(0, 4) || scheduleInfo.slice(0, 4)
  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("getYear", message)
  }
};
