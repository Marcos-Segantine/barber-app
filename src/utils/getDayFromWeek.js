import { handleError } from "../handlers/handleError";

export const getDayOfWeek = (dateString) => {
    try {

        const daysOfWeek = [
            'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
            'Quinta-feira', 'Sexta-feira', 'Sábado'
        ];

        const date = new Date(dateString);
        const dayOfWeek = daysOfWeek[date.getDay() + 1];

        return dayOfWeek;
    } catch ({ message }) {
        handleError("getDayOfWeek", message)
    }
}