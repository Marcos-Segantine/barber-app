import firestore from '@react-native-firebase/firestore';

import { handleError } from "../../handlers/handleError"

import { getUserSchedules } from './getUserSchedules';

export const deleteOldSchedules = async (userUid, setSomethingWrong) => {
    try {

        const userSchedules = await getUserSchedules(userUid, setSomethingWrong)
        await firestore().collection("schedules_by_user").doc(userUid).set({ schedules: userSchedules })

        return userSchedules

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("deleteOldSchedules", message)
    }
}