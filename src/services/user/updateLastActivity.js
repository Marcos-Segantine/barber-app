import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const updateLastActivity = async (userUid, setSomeThingWrong) => {
    try {

        const userRef = firestore().collection("users").doc(userUid)

        const date = new Date()
        const activity = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()

        await userRef.update({ lastActivity: activity })

    } catch ({ message }) {
        setSomeThingWrong(true)
        handleError("updateLastActivity", message)
    }
}
