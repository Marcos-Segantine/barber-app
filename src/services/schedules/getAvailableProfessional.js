/**
 * Retrieves the available professional for a given schedule.
 * 
 * @param {object} schedule - The schedule data object.
 * @param {function} setAvailableProfessional - The function to set the available professional.
 * @param {function} handleProfessionalSelected - The function that set the selected professional.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 */

import firestore from '@react-native-firebase/firestore';

import { getDay, getHour, getMonth, getYear } from '../../utils/dateHelper';
import { getWeekDay } from '../../utils/getWeekDay';

import { handleError } from '../../handlers/handleError';

export const getAvailableProfessional = async (
    schedule,
    setAvailableProfessional,
    handleProfessionalSelected,
    setSomethingWrong
) => {

    try {

        const month = getMonth(schedule)
        const year = getYear(schedule)
        const day = getDay(schedule)
        const hour = getHour(schedule)

        const unavailableTimesRef = firestore().collection("unavailable_times").doc(`${month}_${year}`)
        const barbersRef = firestore().collection("barbers")
        const workingHoursRef = firestore().collection("working_hours")

        const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()
        const barbersDocs = await (await barbersRef.get())._docs

        // Create an array of barbers with necessary data
        const barbersData = barbersDocs.map(docBarber => ({
            name: docBarber._data.name,
            profilePicture: docBarber._data.profilePicture,
            professionalUid: docBarber._data.uid
        }))

        const dayWeek = getWeekDay(schedule.day)

        // Array to store the available professionals
        const dataTemp = []

        // Iterate over each professional
        for (const professional of barbersData) {
            const workingTimesCurrentProfessional = (await workingHoursRef
                .doc(professional.professionalUid)
                .get())
                .data()[dayWeek]

            // Skip if the professional is not available at the hour selected by user
            if (!workingTimesCurrentProfessional.includes(hour)) continue

            // If there are no unavailable_times data  means that the professional is available
            if (unavailableTimesData === undefined) {
                dataTemp.push(professional)
                continue

            }
            // If there is no unavailable_times data for the day selected by user, means that the professional is available
            else if (unavailableTimesData[day] === undefined) {
                dataTemp.push(professional)
                continue

            }
            // If there is no unavailable_times data for the current professional, means that the professional is available
            else if (unavailableTimesData[day][professional.name] === undefined) {
                dataTemp.push(professional)
                continue

            }

            // Get the unavailable times for the current professional
            const unavailableTimesCurrentProfessional = unavailableTimesData[day][professional.name]

            // If the professional is not unavailable at the given hour, add the professional and skip for the next one
            if (!unavailableTimesCurrentProfessional.includes(hour)) {
                dataTemp.push(professional)
                continue
            }
        }

        // If there's only one professional, call a function to auto select this professional to user
        if (dataTemp.length === 1) {
            await handleProfessionalSelected({ name: dataTemp[0].name, professionalUid: dataTemp[0].professionalUid })
        }

        // Set the available professional
        setAvailableProfessional(dataTemp);

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getAvailableProfessional", message)
    }
}
