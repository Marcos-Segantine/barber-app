/**
 * Listener for user schedules.
 * 
 * @param {Object} userData - The user data.
 * @param {function} setSchedulesUser - The function to set the user schedules.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 * @returns {function} - The function to unsubscribe from the listener.
 */

import { getUserSchedules } from "../schedules/getUserSchedules";
import firestore from '@react-native-firebase/firestore';

import { handleError } from "../../handlers/handleError";

export const listenerUserSchedules = (
    userData,
    setSchedulesUser,
    setSomethingWrong
) => {

    try {

        // If there is no user data, return early
        if (!userData) return

        // Create a listener on the 'schedules_by_user' collection
        const unsubscribe = firestore()
            .collection('schedules_by_user')
            .doc(userData.uid)
            .onSnapshot(() => {
                // Call the function to get user schedules
                getUserSchedules(setSchedulesUser, userData.uid, setSomethingWrong)
            });

        // Return the function to unsubscribe from the listener
        return () => unsubscribe();

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("listenerUserSchedules", message)
    }
}
