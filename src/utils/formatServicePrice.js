export const formatServicePrice = (priceService) => {
    priceService = Number(priceService)
    return `R$ ${priceService.toFixed(2).replace(".", ",")}`
}