import { handleError } from "../handlers/handleError";

export const verifyIfUserCanCancelSchedule = (minimalHoursToCancelSchedule, ScheduleDay, scheduleHour, setSomethingWrong) => {
    try {

        const [year, month, day] = ScheduleDay.split('-').map(Number);
        const [hours, minutes] = scheduleHour.split(':').map(Number);

        const userScheduledDateTime = new Date(year, month - 1, day, hours, minutes);

        const currentDateTime = new Date();

        const timeDifference = userScheduledDateTime - currentDateTime;

        const minutesDifference = timeDifference / (1000 * 60);

        if (minutesDifference > 0 && minutesDifference >= minimalHoursToCancelSchedule * 60) {
            return true;
        } else {
            return false;
        }
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("verifyIfUserCanCancelSchedule", message)
    }
}
