import { handleError } from "../handlers/handleError"

export const capitalizeName = (name) => {
    try {

        name = name.split("").map((letter, index) => {
            if (index === 0) return name[index].toUpperCase()
            else if (name[index - 1] === " ") return letter.toUpperCase()
            return letter
        }).join("")

        return name
    } catch ({ message }) {
        handleError("capitalizeName", message)
    }
}
