/**
 * Fetches all the working hours from all professionals.
 * 
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 * @returns {Promise<Array>} - An array with all working hours.
 */

import firestore from '@react-native-firebase/firestore';

export const getAllTimes = async (setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc("default")
        const workingHoursData = (await workingHoursRef.get()).data()?.times

        // If there is no working hours, return `undefined` to frontend show a message explaining that
        if (workingHoursData === undefined) return undefined

        return workingHoursData

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}