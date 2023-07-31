import { getUserSchedules } from "../schedules/getUserSchedules";
import firestore from '@react-native-firebase/firestore';

export const listenerUserSchedules = (
    userData,
    setSchedulesUser,
    setSomethingWrong
) => {
    if (!userData) return

    try {
        const unsubscribe = firestore()
            .collection('schedules_by_user')
            .doc(userData.uid)
            .onSnapshot(() => {
                getUserSchedules(setSchedulesUser, userData.uid, setSomethingWrong)
            });

        return () => unsubscribe();

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}