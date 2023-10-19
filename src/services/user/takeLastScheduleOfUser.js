/**
 * Fetches the latest schedule of a user.
 * 
 * @param {Object} userUid - Information about the user.
 * @param {Function} setScheduleClientInfo - Callback function to set the client schedule information.
 * @param {Function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 */

import firestore from '@react-native-firebase/firestore';

import { filterSchedulesByDate } from '../../utils/filterSchedulesByDate';

import { handleError } from '../../handlers/handleError';

export const takeLastScheduleOfUser = async (
    userUid,
    setSomethingWrong,
    setScheduleClientInfo = null,
) => {
    try {

        // Check if user information is available
        if (!userUid) return

        const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userUid)
        const schedulesByUserData = (await schedulesByUserRef.get()).data().schedules

        const schedulesFiltered = filterSchedulesByDate(schedulesByUserData, setSomethingWrong)

        // Sort the schedules by day in ascending order
        const dates = schedulesFiltered.sort((a, b) => a.day.localeCompare(b.day, undefined, { numeric: true }))

        // If there are no schedules, set the user schedule info to null
        if (!dates[0]) {
            if (setScheduleClientInfo === null) return null
            setScheduleClientInfo(null)
        }
        // Otherwise, set the latest schedule from user
        else {
            if (setScheduleClientInfo === null) return dates[0]
            setScheduleClientInfo(dates[0])
        }

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("takeLastScheduleOfUser", message)
    }
}
