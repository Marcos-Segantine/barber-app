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

export const formatDate = (date, setSomethingWrong) => {
    try {

        if (!date) return

        const month = new Date().getMonth()
        const day = date.slice(8)
        const year = date.slice(0, 4);

        const dateFormatted = `${day} de ${monthsName[month]}, ${year}`

        return dateFormatted

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("formatDate", message)
    }
}