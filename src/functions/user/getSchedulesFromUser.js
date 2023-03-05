import firestore from '@react-native-firebase/firestore';

export const getSchedulesFromUser = async (setShedules, userData) => {
    const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userData.uid)
    const schedulesByUserData = (await schedulesByUserRef.get()).data()

    setShedules(schedulesByUserData.schedules)
}