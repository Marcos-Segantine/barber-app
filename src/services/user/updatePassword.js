/**
 * Updates the user's password and updates the user data in the database.
 * 
 * @param {string} password - The new password.
 * @param {object} userData - The user data.
 * @param {function} setUserData - Function to update the user data.
 * @param {object} navigation - The navigation object.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 */

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const updatePassword = async (
    password,
    userData,
    setUserData,
    navigation,
    setSomethingWrong
) => {

    try {

        const user = auth().currentUser

        // If the updatePassword() call fails due to "auth/requires-recent-login" error,
        // sign in again and retry the updatePassword() call.
        user.updatePassword(password).catch(async (error) => {
            console.log(error.message);
            if (
                error.message
                ===
                "[auth/requires-recent-login] This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
                await auth().signInWithEmailAndPassword(userData.email, userData.password)

                await user.updatePassword(password)
            }
        })

        // Update the user data with the new password.
        const returnUserData = async () => {
            userData.password = password
            return userData
        }

        setUserData(await returnUserData())

        // Update the user data in the database.
        const userRef = firestore().collection('users').doc(userData.uid)
        userRef.set({ ...userData })

        navigation.navigate("Profile")

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}