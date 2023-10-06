import { handleError } from "../handlers/handleError"

export const trim = (data, setSomethingWrong) => {
    try {

        if (typeof data === 'string') {
            return data.trim()
        }

        for (const string of data) {
            data[string] = data[string].trim()
        }

        return data
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("trim", message)
    }
}
