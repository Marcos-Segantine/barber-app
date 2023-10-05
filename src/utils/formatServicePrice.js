import { handleError } from "../handlers/handleError";

export const formatServicePrice = (priceService) => {
    try {

        const numericPrice = Number(priceService);

        const formattedPrice = numericPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });

        return formattedPrice;
    } catch ({ message }) {
        handleError("formatServicePrice", message)
    }
}