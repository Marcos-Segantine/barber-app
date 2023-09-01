import firestore from "@react-native-firebase/firestore";

import { filterSchedulesByDate } from "../utils/filterSchedulesByDate";

export const userSchedulesCount = async (
    userUid,
    setSchedulesUserCount
) => {
    const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userUid)
    const schedulesByUserData = (await schedulesByUserRef.get()).data()

    const data = filterSchedulesByDate(schedulesByUserData.schedules)

    schedulesByUserRef.onSnapshot((data) => {
        setSchedulesUserCount(data.data().schedules.length)
    });

    setSchedulesUserCount(data.length)
}