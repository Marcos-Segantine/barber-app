import firestore from "@react-native-firebase/firestore";

import { filterSchedulesByDate } from "../utils/filterSchedulesByDate";

import { handleError } from "../handlers/handleError";

export const userSchedulesCount = async (
    userUid,
    setSchedulesUserCount,
    setSomethingWrong
) => {

    try {
        const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userUid)

        schedulesByUserRef.onSnapshot((data) => {
            setSchedulesUserCount(filterSchedulesByDate(data.data().schedules, setSomethingWrong).length)
        });

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("userSchedulesCount", message)
    }
}