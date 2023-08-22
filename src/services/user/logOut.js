/**
 * Logs the user out of the application.
 * 
 * @param {Object} navigation - The navigation object.
 * @param {Function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';

export const logOut = async (
    navigation,
    setSomethingWrong
) => {
    try {
        const keys = ['@barber_app__email', '@barber_app__password'];
        await AsyncStorage.multiRemove(keys);

        // Navigate to the Login screen
        navigation.navigate('Login');

        // Sign out the user
        await auth().signOut();

    } catch (error) {
        console.error('Error logging out:', error);
        setSomethingWrong(true)
    }
}
