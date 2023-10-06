import { handleError } from "../handlers/handleError";

export const isValidEmail = (email, setSomethingWrong) => {
    try {
        if (email === undefined) return false

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("isValidEmail", message)
    }
}