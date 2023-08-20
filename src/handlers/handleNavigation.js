/**
 * Handles navigation based on the previous and last screens.
 *
 * @param {string} previousScreen - The name of the previous screen.
 * @param {string} lastScreen - The name of the last screen (current screen when the function is called).
 * @param {object} navigation - The navigation object.
 * @param {object} userData - The user data object.
 * @returns {boolean} - Indicates if the navigation was successful.
 */

import auth from '@react-native-firebase/auth';

export const handleNavigation = (
    previousScreen,
    lastScreen,
    navigation,
    userData
) => {

    if (
        previousScreen === 'Welcome' ||
        previousScreen === 'Login' ||
        previousScreen === 'Register' ||
        previousScreen === 'CreateNewPassword' && userData ||
        lastScreen === "Login" && previousScreen === "Profile" ||
        lastScreen === "Login" && previousScreen === "Welcome" ||
        lastScreen === "LoginWay" && previousScreen === "Welcome"
    ) {

        // Check if the user is authenticated and user data is available
        if (auth().currentUser && userData) {
            navigation.navigate('Home')

            return true
        }
        else {
            navigation.navigate('LoginWay')

            return true
        }
    }
    else if (lastScreen === "NewSchedule" && previousScreen === "ConfirmSchedule") {
        navigation.navigate('Home')

        return true
    }
    else if (lastScreen === "Home") {
        return true
    }
    else {
        navigation.navigate(previousScreen)

        return true
    }
}