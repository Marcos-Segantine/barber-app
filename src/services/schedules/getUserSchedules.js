/**
 * Retrieves the schedules of the user and updates the state with the retrieved data.
 * 
 * @param {function} setSchedules - Function to update the state with the retrieved schedules.
 * @param {string} userUid - The unique identifier of the user.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 */

import firestore from '@react-native-firebase/firestore';

export const getUserSchedules = async (setSchedules, userUid, setSomethingWrong) => {
    try {

        const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userUid)
        const schedulesByUserData = (await schedulesByUserRef.get()).data().schedules

        // Update the state with the retrieved schedules
        setSchedules(schedulesByUserData)

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}
