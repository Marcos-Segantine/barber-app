export const getMonthName = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long" };
    const locale = "pt-BR";
    const month = date.toLocaleString(locale, options);

    return month;
}
