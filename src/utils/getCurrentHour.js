import { handleError } from "../handlers/handleError";

export const getCurrentHour = () => {
    try {

        return new Date().getHours();
    } catch ({ message }) {
        handleError("getCurrentHour", message)
    }
}