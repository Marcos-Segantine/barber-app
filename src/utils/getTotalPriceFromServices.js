import { handleError } from "../handlers/handleError"

export const getTotalPriceFromServices = (schedules, setSomethingWrong) => {
    try {

        if (!!schedules.services) {
            return schedules.services.reduce((acc, service) => acc + Number(service.price), 0)
        }
        else return schedules.reduce((acc, service) => acc + Number(service.price), 0)
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getTotalPriceFromServices", message)
    }
}