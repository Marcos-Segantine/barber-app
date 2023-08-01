import firestore from '@react-native-firebase/firestore';

import { getDay, getHour, getMonth, getYear } from '../../utils/dateHelper';

import { getWeekDay } from '../../utils/getWeekDay';

export const getAvailableProfessional = async (schedule, setAvailableProfessional, setSomethingWrong) => {
    try {

        const month = getMonth(schedule)
        const year = getYear(schedule)
        const day = getDay(schedule)
        const hour = getHour(schedule)

        const unavailableTimesRef = firestore().collection("unavailable_times").doc(`${month}_${year}`)
        const barbersRef = firestore().collection("barbers")
        const workingHoursRef = firestore().collection("working_hours")

        const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()
        const barbersData = await (await barbersRef.get())._docs.map(docBarber => ({
            name: docBarber._data.name,
            profilePicture: docBarber._data.profilePicture,
            professionalUid: docBarber._data.uid
        }))

        const dayWeek = getWeekDay(schedule.day)
        const dataTemp = []

        for (const professional of barbersData) {
            const workingTimesCurrentProfessional = (await workingHoursRef
                .doc(professional.professionalUid)
                .get())
                .data()[dayWeek]

            if (!workingTimesCurrentProfessional.includes(hour)) continue

            if (unavailableTimesData === undefined) {
                dataTemp.push(professional)
                continue

            }
            else if (unavailableTimesData[day] === undefined) {
                dataTemp.push(professional)
                continue

            }
            else if (unavailableTimesData[day][professional.name] === undefined) {
                dataTemp.push(professional)
                continue

            }

            const unavailableTimesCurrentProfessional = unavailableTimesData[day][professional.name]

            if (!unavailableTimesCurrentProfessional.includes(hour)) {
                dataTemp.push(professional)
                continue
            }
        }

        setAvailableProfessional(dataTemp);

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
}
