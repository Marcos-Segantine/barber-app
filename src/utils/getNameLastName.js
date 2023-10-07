import { handleError } from "../handlers/handleError"

export const getNameLastName = (name, setSomethingWrong) => {
    try {
        if (!name) return null

        name = name.split("")

        return name.length > 12 ? name.splice(0, 12).join("") + "..." : name.join("")

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getNameLastName", message)
    }
}
