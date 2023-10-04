export const formatServicePrice = (priceService) => {
    const numericPrice = Number(priceService);

    const formattedPrice = numericPrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });

    return formattedPrice;
}