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