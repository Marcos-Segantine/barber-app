import { handleError } from "../handlers/handleError";

export const formatServicePrice = (priceService, setSomethingWrong) => {
    try {

        const numericPrice = Number(priceService);

        const formattedPrice = numericPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });

        return formattedPrice;
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("formatServicePrice", message)
    }
}