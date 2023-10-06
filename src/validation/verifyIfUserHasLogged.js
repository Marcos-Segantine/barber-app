import AsyncStorage from "@react-native-async-storage/async-storage";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { handleError } from "../handlers/handleError";

export const verifyIfUserHasLogged = async (navigation, setSomethingWrong) => {
    try {
        const email = await AsyncStorage.getItem("@barber_app__email");

        if (email) {
            const usersRef = firestore().collection("users").where("email", "==", email)
            const userData = await usersRef.get()
            const user = userData.docs.length ? userData.docs[0].data() : null

            if (!user) {
                setTimeout(() => {
                    navigation.navigate("Login")
                }, 500);

                return
            }

            const userEmailVerified = auth().currentUser?.emailVerified

            if (userEmailVerified) {
                setTimeout(() => {
                    navigation.navigate("Home")
                }, 500);
            }
            else if (user.empty || !userEmailVerified) {
                setTimeout(() => {
                    navigation.navigate("Login")
                }, 500);
            }

        } else {
            setTimeout(() => {
                navigation.navigate("LoginWay");
            }, 500);
        }

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("verifyIfUserHasLogged", message)
        
    }
}
