import { handleError } from "../handlers/handleError"

const monthsName = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
]

export const formatDate = (date, setSomethingWrong, showYear) => {
    try {

        if (!date) return

        const month = new Date().getMonth()
        const day = date.slice(8)

        if (showYear) {
            const year = date.slice(0, 4);
            return `${day} de ${monthsName[month]}, ${year}`
        }

        return `${day} de ${monthsName[month]}`

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("formatDate", message)
    }
}