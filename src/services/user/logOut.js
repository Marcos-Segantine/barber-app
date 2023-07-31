import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';

export const logOut = async (navigation, setSomethingWrong) => {
    try {
        const keys = ['@barber_app__email', '@barber_app__password'];
        await AsyncStorage.multiRemove(keys);

        navigation.navigate('Login');

        await auth().signOut();

    } catch (error) {
        console.error('Error logging out:', error);
        setSomethingWrong(true)
    }
}
