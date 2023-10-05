import firestore from "@react-native-firebase/firestore";

import { filterSchedulesByDate } from "../utils/filterSchedulesByDate";

import { handleError } from "../handlers/handleError";

export const userSchedulesCount = async (
    userUid,
    setSchedulesUserCount
) => {

    try {
        const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userUid)

        schedulesByUserRef.onSnapshot((data) => {
            setSchedulesUserCount(filterSchedulesByDate(data.data().schedules).length)
        });

    } catch ({ message }) {
        handleError("userSchedulesCount", message)
    }
}