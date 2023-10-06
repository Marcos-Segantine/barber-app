import { handleError } from "../handlers/handleError";

export const getWeekDay = (dateString, setSomethingWrong) => {
    try {

        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();

        if (dayOfWeek === 0) return "sunday"
        else if (dayOfWeek === 6) return "saturday"
        else return "weekday"
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getWeekDay", message)
    }
}