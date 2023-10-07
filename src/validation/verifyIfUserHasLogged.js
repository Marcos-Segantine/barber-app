import AsyncStorage from "@react-native-async-storage/async-storage";

import auth from '@react-native-firebase/auth';

import { handleError } from "../handlers/handleError";

import { deleteOldSchedules } from "../services/schedules/deleteOldSchedules";
import { getUserDataContext } from "../services/user/getUserDataContext";

export const verifyIfUserHasLogged = async (navigation, setUserData, setSomethingWrong) => {
    try {
        const email = await AsyncStorage.getItem("@barber_app__email");

        if (email) {
            const user = await getUserDataContext(setUserData, email, setSomethingWrong)

            if (!user) {
                navigation.navigate("Login")

                return
            }

            const userEmailVerified = auth().currentUser?.emailVerified

            if (userEmailVerified) {
                const schedulesUpdated = await deleteOldSchedules(user.uid, setSomethingWrong)

                setUserData({
                    ...user,
                    schedules: schedulesUpdated
                })

                navigation.navigate("Home")
            }
            else if (user.empty || !userEmailVerified) {
                navigation.navigate("Login")
            }

        } else {
            navigation.navigate("LoginWay");
        }

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("verifyIfUserHasLogged", message)
    }
}
