import { handleError } from "../handlers/handleError";

export const isValidPhoneNumber = (phoneNumber) => {

    try {
        if (phoneNumber === undefined) return false

        const cleanedNumber = phoneNumber.replace(/\D/g, '');

        if (cleanedNumber.length !== 10 && cleanedNumber.length !== 11) return false;

        return true;

    } catch ({ message }) {
        handleError("isValidPhoneNumber", message)
    }
}
