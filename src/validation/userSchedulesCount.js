import firestore from "@react-native-firebase/firestore";

import { filterSchedulesByDate } from "../utils/filterSchedulesByDate";

export const userSchedulesCount = async (
    userUid,
    setSchedulesUserCount
) => {
    const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userUid)

    schedulesByUserRef.onSnapshot((data) => {
        setSchedulesUserCount(filterSchedulesByDate(data.data().schedules).length)
    });

}