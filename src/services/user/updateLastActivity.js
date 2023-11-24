import firestore from "@react-native-firebase/firestore";

import { handleError } from "../../handlers/handleError";

export const updateLastActivity = async (userUid, setSomethingWrong) => {
    try {

        const userRef = firestore().collection("users").doc(userUid)

        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth();
        const day = date.getDate()

        const now = `${year}-${month}-${day}`

        userRef.update({
            lastActivity: now
        })

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("updateLastActivity", message)
    }
}
