import firestore from '@react-native-firebase/firestore';

import { handleError } from "../../handlers/handleError"

export const getUserDataContext = async (setUserData, userEmail, setSomethingWrong) => {
    try {
        if (userEmail) {

            const userRef = await firestore().collection("users").where("email", "==", userEmail).get()
            if (!userRef.docs.length) return

            // Get the user data from the first user document.
            // Each user has their unique email, so it is safe to take the first document.
            const userDataCollection = userRef.docs[0].data()

            // If no user data is available, return early.
            if (!userDataCollection) return

            // Set the userData state with the user data.
            if (userDataCollection) {
                const data = {
                    name: userDataCollection.name,
                    email: userDataCollection.email,
                    password: userDataCollection.password,
                    phone: userDataCollection.phone,
                    profilePicture: userDataCollection.profilePicture,
                    gender: userDataCollection.gender,
                    uid: userDataCollection.uid,
                    informationEditedCount: userDataCollection.informationEditedCount,
                    phoneNumberValidated: userDataCollection.phoneNumberValidated
                }

                setUserData(data)
                return data
            }
        } else {
            setUserData(null)
            return null
        }

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("UserProvider", message)
    }
}