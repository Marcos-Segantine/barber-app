import AsyncStorage from "@react-native-async-storage/async-storage";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const verifyIfUserHasLogged = async (navigation) => {
    try {
        const email = await AsyncStorage.getItem("@barber_app__email");

        if (email) {
            const usersRef = firestore().collection("users").where("email", "==", email)
            const user = (await usersRef.get()).docs.length ? (await usersRef.get()).docs[0].data() : null

            if (!user) {
                setTimeout(() => {
                    navigation.navigate("Login")
                }, 3000);

                return
            }

            const userEmailVerified = auth().currentUser?.emailVerified

            if (userEmailVerified) {
                setTimeout(() => {
                    navigation.navigate("Home")
                }, 3000);
            }
            else if (user.empty || !userEmailVerified) {
                setTimeout(() => {
                    navigation.navigate("Login")
                }, 3000);
            }

        } else {
            setTimeout(() => {
                navigation.navigate("LoginWay");
            }, 3000);
        }

    } catch (error) {
        console.log("verifyIfUserHasLogged", error);
    }
}