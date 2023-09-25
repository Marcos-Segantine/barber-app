/**
 * Retrieves the available times from a professional selected by user.
 * 
 * @param {Object} scheduleInfo - The schedule information.
 * @param {string} professionalUid - The unique identifier of the professional.
 * @param {Function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 * @returns {Array} - The available times for the professional.
 */

import firestore from '@react-native-firebase/firestore';

import { getDay, getMonth, getYear } from '../../utils/dateHelper';
import { getCurrentHour } from '../../utils/getCurrentHour';
import { getWeekDay } from '../../utils/getWeekDay';
import { sortByHour } from '../../utils/sortByHour';

export const getAvailableTimesByProfessional = async (
    scheduleInfo,
    professionalUid,
    setSomethingWrong
) => {
    try {

        const year = getYear(scheduleInfo);
        const month = getMonth(scheduleInfo);
        const day = getDay(scheduleInfo);

        const weekday = getWeekDay(scheduleInfo.day)

        const unavailableTimesRef = firestore().collection("unavailable_times").doc(`${month}_${year}`)
        const workingHoursRef = firestore().collection('working_hours').doc(professionalUid)

        const workingHoursData = (await workingHoursRef.get({ source: "server" })).data()[weekday]
        const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()

        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentHour = +getCurrentHour();
        const currentMinutes = +new Date().getMinutes();

        const verifyHourAndMinutes = (schedule) => {
            const hour = +schedule.split(':')[0]
            const minutes = +schedule.split(':')[1]

            return hour >= currentHour && (hour === currentHour ? !!(minutes > currentMinutes) : true)
        }

        // Check if the current date matches the schedule date
        const currentDate = Number(day) === Number(currentDay) && Number(currentMonth) === Number(month)

        // Return undefined if there are no working hours for the professional
        // The frontend will show a message explaining that
        if (workingHoursData === undefined) return undefined

        // Return all working hours if there are no unavailable times
        if (!unavailableTimesData) return workingHoursData

        // Return the working hours filtered by unavailable times from the professional and
        // Current hour, that is, just return the hour that doesn't passed
        else if (unavailableTimesData[day] && currentDate)
            return workingHoursData.filter(schedule => verifyHourAndMinutes(schedule) && !unavailableTimesData[day][professionalUid].includes(schedule))

        // If there's no unavailable times for the day selected, means that the professional is available 
        // So, just return the hour that doesn't passed
        else if (!unavailableTimesData[day] && currentDate)
            return workingHoursData.filter(schedule => verifyHourAndMinutes(schedule))

        // Return the working hours filtered by unavailable times from the professional and
        // Current hour, that is, just return the hour that doesn't passed
        else if (unavailableTimesData[day]?.[professionalUid] && currentDate)
            return workingHoursData.filter(schedule => verifyHourAndMinutes(schedule) && !unavailableTimesData[day][professionalUid].includes(schedule))

        // If the there's no unavailable times for the professional in selected day
        // So, just return the hour that doesn't passed
        else if (!unavailableTimesData[day]?.[professionalUid] && currentDate)
            return workingHoursData.filter(schedule => verifyHourAndMinutes(schedule))

        // If there's no unavailable times in the selected day and professional, just return all working hours
        else if (!unavailableTimesData[day]) return workingHoursData
        else if (!unavailableTimesData[day][professionalUid]) return workingHoursData

        // Filter the working hours by removing the unavailable times from the professional
        const dataTemp = workingHoursData.filter(time => {
            return !unavailableTimesData[day][professionalUid].includes(time)
        })

        return sortByHour(dataTemp)

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
};
