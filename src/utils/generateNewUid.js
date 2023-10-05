import { handleError } from "../handlers/handleError";

export const generateNewUid = () => {
    try {

        return Math.random().toString(36).substring(2) + Date.now();
    } catch ({ message }) {
        handleError("generateNewUid", message)
    }
}