/**
 * Handles remembering email and password based on the given parameters.
 * 
 * @param {string} userEmail - The user's email.
 * @param {boolean} isToMakeAutomaticLogin - Flag indicating id user wants to make automatic login.
 * @returns {boolean} - True if user was able to make automatic login, false otherwise.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleAutomaticLogin = async (userEmail, isToMakeAutomaticLogin) => {
    if (isToMakeAutomaticLogin) {
        await AsyncStorage.removeItem("@barber_app__email")
        
    } else await AsyncStorage.setItem("@barber_app__email", userEmail)

    return !!!isToMakeAutomaticLogin
}