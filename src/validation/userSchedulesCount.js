import firestore from "@react-native-firebase/firestore";

export const userSchedulesCount = async (
    userUid,
    setSchedulesUserCount
) => {
    const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userUid)
    const schedulesByUserData = (await schedulesByUserRef.get()).data()

    schedulesByUserRef.onSnapshot((data) => {
        setSchedulesUserCount(data.data().schedules.length)
    });

    setSchedulesUserCount(schedulesByUserData.length)
}