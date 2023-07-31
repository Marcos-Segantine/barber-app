import firestore from '@react-native-firebase/firestore';

export const getUserSchedules = async (setSchedules, userUid, setSomethingWrong) => {
    try {

        const schedulesByUserRef = firestore().collection("schedules_by_user").doc(userUid)
        const schedulesByUserData = (await schedulesByUserRef.get()).data().schedules

        setSchedules(schedulesByUserData)
    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}