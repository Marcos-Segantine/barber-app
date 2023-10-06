import { handleError } from "../handlers/handleError";

export const getMonthName = (dateString, setSomethingWrong) => {
    try {

        const date = new Date(dateString);
        const options = { month: "long" };
        const locale = "pt-BR";
        const month = date.toLocaleString(locale, options);

        return month;
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getMonthName", message)
    }
}
