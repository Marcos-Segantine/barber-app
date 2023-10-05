import { handleError } from "../handlers/handleError";

export const isValidEmail = (email) => {
    try {
        if (email === undefined) return false

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);

    } catch ({ message }) {
        handleError("isValidEmail", message)
    }
}