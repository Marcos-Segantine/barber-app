import firestore from '@react-native-firebase/firestore';

import { getDay, getMonth, getProfessional, getYear } from '../../utils/dateHelper';

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

        const currentDay = new Date(scheduleInfo.day).getDay() + 1
        const weekday = currentDay <= 5 ? "weekday" : currentDay === 6 ? "saturday" : "sunday"

        const unavailableTimesRef = firestore().collection("unavailable_times").doc(`${month}_${year}`)
        const workingHoursRef = firestore().collection('working_hours').doc(professionalUid)

        const workingHoursData = (await workingHoursRef.get({ source: "server" })).data()
        const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()

        if (workingHoursData === undefined) return undefined

        if (!unavailableTimesData) return workingHoursData[weekday]
        else if (!unavailableTimesData[day]) return workingHoursData[weekday]
        else if (!unavailableTimesData[day][professional]) return workingHoursData[weekday]

        const dataTemp = workingHoursData[weekday].filter(time => {
            return !unavailableTimesData[day][professional].includes(time)
        })

        return dataTemp

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
};
