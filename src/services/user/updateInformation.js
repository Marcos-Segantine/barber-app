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

        // Set a document with an empty array in the schedules_by_user collection
        batch.set(schedulesByUserRef, {
            schedules: [],
        })

        // Upload the new profile picture if provided
        if (informationNewUser.profilePicture) {
            const referenceProfilePicture = storage().ref('clients/profilePictures/' + uid);
            await referenceProfilePicture.putString(informationNewUser.profilePicture, 'base64')
        }

        // Get the download URL of the profile picture if it exists
        const pic = informationNewUser.profilePicture ? await storage().ref("clients/profilePictures/" + uid).getDownloadURL() : null


        const name = informationNewUser?.name?.split("").map((letter, index) => {
            if(index === 0) return informationNewUser.name[index].toUpperCase()
            else if (informationNewUser.name[index - 1] === " ") return letter.toUpperCase()
            return letter
        }).join("")

        // Create an object with the updated user data
        const userDataObj = {
            name: name || userData.name,
            nickname: informationNewUser.nickname || userData.nickname,
            email: informationNewUser.email || userData.email,
            password: password || userData.password,
            phone: informationNewUser.phone || userData.phone,
            gender: informationNewUser.gender || userData.gender,
            profilePicture: pic || userData.profilePicture,
            uid: uid,
        }

        batch.set(userRef, userDataObj)

        setUserData(userDataObj)

        await batch.commit()

        setIsLoading(false)

        // Navigate to the appropriate screen based on whether it's a new user or not
        if (isToCreateUser) navigation.navigate("Home")
        else navigation.navigate("Profile")

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}