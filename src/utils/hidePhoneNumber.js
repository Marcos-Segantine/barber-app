import { handleError } from "../handlers/handleError"

export const hidePhoneNumber = (phoneNumber) => {
    try {


        const firstPartNumber = phoneNumber.split("").splice(0, 4).join("")
        const finalPartNumber = phoneNumber.split("").splice(9).join("")

        return firstPartNumber + "*****" + finalPartNumber
    } catch ({ message }) {
        handleError("hidePhoneNumber", message)
    }
}