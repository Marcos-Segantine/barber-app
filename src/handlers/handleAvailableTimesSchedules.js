/**
 * Handles available times for schedules.
 * 
 * @param {Object} schedule - The schedule object.
 * @param {boolean} preferProfessional - Indicates if user prefer schedules or professionals.
 * @param {function} setSomethingWrong - Callback function to set SomethingWrongContext as true if some thing wrong happen.
 * @param {function} setAvailableTimes - Callback function to set available times.
 * @param {function} setAllTimes - Callback function to set all times.
 */

import { getAvailableTimesByProfessional } from "../services/schedules/getAvailableTimesByProfessional";
import { getAllTimes } from "../services/schedules/getAllTimes";

import { handleError } from "./handleError";

export const handleAvailableTimesSchedules = async (
    schedule,
    preferProfessional,
    setSomethingWrong,
    setAvailableTimes,
    setAllTimes
) => {

    try {
        if (schedule.professional && schedule.day && preferProfessional) {
            // Get available times from a professional 
            setAvailableTimes(
                await getAvailableTimesByProfessional(schedule.professionalUid, schedule, setSomethingWrong)
            );

            // Get all times from all professionals
        } else if (!preferProfessional) setAllTimes(await getAllTimes(setSomethingWrong));

    } catch ({ message }) {
        setSomethingWrong(true);
        handleError("handleAvailableTimesSchedules", message);
    }
}