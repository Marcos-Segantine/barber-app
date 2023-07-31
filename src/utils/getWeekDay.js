export const getWeekDay = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay() + 1;

    if (dayOfWeek === 0) return "sunday";
    else if (dayOfWeek === 6) return "saturday";
    else return "weekday"
}
