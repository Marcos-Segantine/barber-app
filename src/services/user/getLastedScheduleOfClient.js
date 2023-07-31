import firestore from '@react-native-firebase/firestore';

export const getLastedScheduleOfClient = async (userInfo, setScheduleClientInfo, setSomethingWrong) => {
    try {

        if (!userInfo) return

        const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userInfo.uid)
        const schedulesByUserData = (await schedulesByUserRef.get()).data().schedules

        const dates = schedulesByUserData.sort((a, b) => a.day.localeCompare(b.day, undefined, { numeric: true }))

        if (!dates[0]) setScheduleClientInfo(null)
        else setScheduleClientInfo(dates[0])

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}
