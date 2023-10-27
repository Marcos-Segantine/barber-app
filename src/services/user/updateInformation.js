/**
 * Updates user information in the database.
 * 
 * @param {Object} informationNewUser - The updated user information.
 * @param {string} password - The user's password.
 * @param {string} uid - The user's unique id.
 * @param {Object} navigation - The navigation object.
 * @param {function} setUserData - The function to set the user data.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 * @param {boolean} isToCreateUser - Flag indicating if it's a new user.
 * @param {function} setIsLoading - The function to set the loading state.
 */

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { trim } from '../../utils/trim';
import { capitalizeName } from '../../utils/capitalizeName';

import { handleError } from '../../handlers/handleError';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateInformation = async (
    informationNewUser,
    password,
    uid,
    navigation,
    setUserData,
    setSomethingWrong,
    isToCreateUser,
    setIsLoading
) => {
    try {
        setIsLoading(true)

        const schedulesByUserRef = firestore().collection('schedules_by_user').doc(uid)

        // Get the current user data
        const userRef = firestore().collection('users').doc(uid)
        const userData = (await userRef.get()).data()

        const batch = firestore().batch()

        if (isToCreateUser) {
            // Set a document with an empty array in the schedules_by_user collection
            batch.set(schedulesByUserRef, {
                schedules: [],
            })

        }

        // Upload the new profile picture if provided
        if (informationNewUser.profilePicture) {
            const referenceProfilePicture = storage().ref('clients/profilePictures/' + uid);
            await referenceProfilePicture.putString(informationNewUser.profilePicture, 'base64')

            await AsyncStorage.setItem("@barber_app__profile_picture", informationNewUser.profilePicture)
        }

        // Get the download URL of the profile picture if it exists
        const pic = informationNewUser.profilePicture ? await storage().ref("clients/profilePictures/" + uid).getDownloadURL() : null

        const name = capitalizeName(informationNewUser?.name)

        const date = new Date()
        const currentDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

        const phoneChanged = !!informationNewUser.phone

        // Create an object with the updated user data
        const userDataObj = {
            name: trim(name || userData.name, setSomethingWrong),
            email: trim(informationNewUser.email || userData.email, setSomethingWrong),
            password: password || userData.password,
            phone: informationNewUser.phone || userData.phone,
            gender: informationNewUser.gender || userData.gender,
            profilePicture: pic || userData.profilePicture,
            uid: uid,
            informationEditedCount: {
                counter: userData.informationEditedCount.counter + 1,
                lastUpdated: currentDate
            },
            phoneNumberValidated: phoneChanged ? false : !!userData.phoneNumberValidated
        }

        batch.set(userRef, userDataObj)

        setUserData(userDataObj)

        await batch.commit()

        setIsLoading(false)

        if (phoneChanged) {
            navigation.navigate("GetCode")
            return
        }

        // Navigate to the appropriate screen based on whether it's a new user or not
        if (isToCreateUser) navigation.navigate("Home")
        else navigation.navigate("Profile")

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("updateInformation", message)
    }
}