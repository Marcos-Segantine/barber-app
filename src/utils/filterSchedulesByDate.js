export const filterSchedulesByDate = (schedules) => {
    if(!schedules) return null

    const currentDay = Number(new Date().getDate());
    const currentMonth = Number(new Date().getMonth() + 1);
    const currentYear = Number(new Date().getFullYear());

    const data = schedules.filter(schedule => {
        const [scheduleYear, scheduleMonth, scheduleDay] = schedule.day.split("-").map(Number);

        if (scheduleYear < currentYear) return false;
        if (scheduleMonth < currentMonth && scheduleYear === currentYear) return false;
        if (scheduleDay < currentDay && scheduleMonth === currentMonth && scheduleYear === currentYear) return false;

        return true;
    })

    return data
}