/**
 * Fetches all the working hours from all professionals.
 * 
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 * @returns {Promise<Array>} - An array with all working hours.
 */

import firestore from '@react-native-firebase/firestore';

import { sortByHour } from '../../utils/sortByHour';

import { handleError } from '../../handlers/handleError';

export const getAllTimes = async (setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc("default")
        const workingHoursData = (await workingHoursRef.get()).data()?.times

        // If there is no working hours, return `undefined` to frontend show a message explaining that
        if (workingHoursData === undefined) return undefined

        return sortByHour(workingHoursData, setSomethingWrong)

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getAllTimes", message)
    }
}