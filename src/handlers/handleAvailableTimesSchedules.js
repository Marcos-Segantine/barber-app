import { getAvailableTimesByProfessional } from "../services/schedules/getAvailableTimesByProfessional";
import { getAllTimes } from "../services/schedules/getAllTimes";

export const handleAvailableTimesSchedules = async (
    schedule,
    preferProfessional,
    setSomethingWrong,
    setAvailableTimes,
    setAllTimes
) => {

    try {
        if (schedule.professional && schedule.day && preferProfessional) {
            setAvailableTimes(
                await getAvailableTimesByProfessional(schedule, schedule.professionalUid, setSomethingWrong)
            );
        } else if (!preferProfessional) {
            setAllTimes(await getAllTimes(setSomethingWrong));
        }
    } catch (error) {
        console.error(error);
        setSomethingWrong(true);
    }
}