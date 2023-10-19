import firestore from '@react-native-firebase/firestore';

export const updateUserDataDB = async(userData, setSomethingWrong) => {
    const userRef = firestore().collection("users").doc(userData.uid)
    userRef.update({ ...userData })
}