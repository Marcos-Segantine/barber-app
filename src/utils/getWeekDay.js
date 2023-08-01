export const getWeekDay = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

    if(dayOfWeek === 0) return "sunday"
    else if(dayOfWeek === 6) return "saturday"
    else return "weekday"
}