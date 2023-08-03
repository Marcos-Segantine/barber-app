import firestore from '@react-native-firebase/firestore';

import { getDay, getMonth, getProfessional, getYear } from '../../utils/dateHelper';
import { getCurrentHour } from '../../utils/getCurrentHour';
import { getWeekDay } from '../../utils/getWeekDay';

export const getAvailableTimesByProfessional = async (
    scheduleInfo,
    professionalUid,
    setSomethingWrong
) => {
    try {

        const year = getYear(scheduleInfo);
        const month = getMonth(scheduleInfo);
        const day = getDay(scheduleInfo);
        const professional = getProfessional(scheduleInfo)

        const weekday = getWeekDay(scheduleInfo.day)

        const unavailableTimesRef = firestore().collection("unavailable_times").doc(`${month}_${year}`)
        const workingHoursRef = firestore().collection('working_hours').doc(professionalUid)

        const workingHoursData = (await workingHoursRef.get({ source: "server" })).data()[weekday]
        const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()

        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentHour = getCurrentHour();

        const currentDate = Number(day) === Number(currentDay) && Number(currentMonth) === Number(month)

        if (workingHoursData === undefined) return undefined

        if (!unavailableTimesData) return workingHoursData
        else if (unavailableTimesData[day] && currentDate)
            return workingHoursData.filter(schedule => Number(schedule.split(":")[0]) > Number(currentHour) && !unavailableTimesData[day][professional].includes(schedule))
        else if (!unavailableTimesData[day] && currentDate)
            return workingHoursData.filter(schedule => Number(schedule.split(":")[0]) > Number(currentHour))
        else if (unavailableTimesData[day]?.[professional] && currentDate)
            return workingHoursData.filter(schedule => Number(schedule.split(":")[0]) > Number(currentHour) && !unavailableTimesData[day][professional].includes(schedule))
        else if (!unavailableTimesData[day]?.[professional] && currentDate)
            return workingHoursData.filter(schedule => Number(schedule.split(":")[0]) > Number(currentHour))

        else if (!unavailableTimesData[day]) return workingHoursData
        else if (!unavailableTimesData[day][professional]) return workingHoursData

        const dataTemp = workingHoursData.filter(time => {
            return !unavailableTimesData[day][professional].includes(time)
        })

        return dataTemp

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
};
