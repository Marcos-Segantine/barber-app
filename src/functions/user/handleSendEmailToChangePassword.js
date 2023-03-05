import auth from '@react-native-firebase/auth';

export const handleSendEmailToChangePassword = async (setModalChangePassword) => {
    const user = auth().currentUser
    try {
        await auth().sendPasswordResetEmail(user.email)
        setModalChangePassword(false)
    } catch (error) {
        console.error(error);
    }
}