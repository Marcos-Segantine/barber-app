export const getTotalPriceFromServices = (schedules) => {
    if (!!schedules.services) {
        return schedules.services.reduce((acc, service) => acc + Number(service.price), 0)
    }
    else return schedules.reduce((acc, service) => acc + Number(service.price), 0)
}