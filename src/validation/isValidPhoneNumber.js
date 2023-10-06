import { handleError } from "../handlers/handleError";

export const isValidPhoneNumber = (phoneNumber, setSomethingWrong) => {

    try {
        if (phoneNumber === undefined) return false

        const cleanedNumber = phoneNumber.replace(/\D/g, '');

        if (cleanedNumber.length !== 10 && cleanedNumber.length !== 11) return false;

        return true;

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("isValidPhoneNumber", message)
    }
}
