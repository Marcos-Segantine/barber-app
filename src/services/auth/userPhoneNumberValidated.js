import firestore from '@react-native-firebase/firestore';

export const userPhoneNumberValidated = (userUid) => {
    const usersRef = firestore().collection("users").doc(userUid);

    usersRef.update({
        phoneNumberValidated: true
    })
}