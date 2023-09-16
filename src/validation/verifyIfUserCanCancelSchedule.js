export const verifyIfUserCanCancelSchedule = (minimalHoursToCancelSchedule, ScheduleDay, scheduleHour) => {
    const [year, month, day] = ScheduleDay.split('-').map(Number);
    const [hours, minutes] = scheduleHour.split(':').map(Number);

    const userScheduledDateTime = new Date(year, month - 1, day, hours, minutes);

    const currentDateTime = new Date();

    const timeDifference = userScheduledDateTime - currentDateTime;

    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference >= minimalHoursToCancelSchedule) {
        if (timeDifference > 0) {
        } else {
        }
    } else {
    }

}
