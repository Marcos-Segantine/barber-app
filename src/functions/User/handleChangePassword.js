import firestore from '@react-native-firebase/firestore';

export const handleChangePassword = async (userData, setmodalChangePassword, navigation) => {
    const usersRef = firestore().collection('users').doc(userData.uid)
    const userRefData = (await usersRef.get()).data()

    if (userRefData.password === null || !userRefData.password) setmodalChangePassword(true);
    else navigation.navigate('ChangePassword');
};