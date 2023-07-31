import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const updatePassword = async (password, userData, setUserData, navigation, setSomethingWrong) => {
    try {

        const user = auth().currentUser

        user.updatePassword(password).catch(async (error) => {
            console.log(error.message);
            if (
                error.message
                ===
                "[auth/requires-recent-login] This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
                await auth().signInWithEmailAndPassword(userData.email, userData.password)

                await user.updatePassword(password)
            }
        })

        const returnUserData = async () => {
            userData.password = password
            return userData
        }

        setUserData(await returnUserData())

        const userRef = firestore().collection('users').doc(userData.uid)
        userRef.set({ ...userData })

        navigation.navigate("Profile")

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}