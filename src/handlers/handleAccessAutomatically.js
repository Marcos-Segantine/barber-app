import AsyncStorage from '@react-native-async-storage/async-storage';

import { handleError } from './handleError';

export const handleAccessAutomatically = async (accessAutomatically, setAccessAutomatically, userEmail, setSomethingWrong) => {
    try {

        if (!userEmail) return

        setAccessAutomatically(accessAutomatically)

        if (accessAutomatically) {
            await AsyncStorage.setItem("@barber_app__email", userEmail)
            await AsyncStorage.setItem("@barber_app__access_automatically", "true")

        } else {
            await AsyncStorage.setItem("@barber_app__access_automatically", "false")
            await AsyncStorage.removeItem("@barber_app__email")
        }
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleAccessAutomatically", message)
    }
}
