/**
 * Listens for the last schedule of a client.
 * 
 * @param {Object} userData - The user data.
 * @param {Function} setScheduleClientInfo - Function to set the schedule client info.
 * @param {Function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 */

import firestore from "@react-native-firebase/firestore";

import { takeLastScheduleOfUser } from "./takeLastScheduleOfUser";

import { handleError } from "../../handlers/handleError";

export const listenerGetLastedScheduleOfClient = (
    userData,
    setScheduleClientInfo,
    setSomethingWrong,
) => {
    try {


        if (userData) {
            const docRef = firestore().collection("schedules_by_user").doc(userData.uid);

            // Listen for changes in the document
            docRef.onSnapshot(() => {
                takeLastScheduleOfUser(userData.uid, setSomethingWrong, setScheduleClientInfo);
            });
        }
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("listenerGetLastedScheduleOfClient", message);
    }
}
