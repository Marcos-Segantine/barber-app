import firestore from '@react-native-firebase/firestore';

import { handleError } from '../handlers/handleError';

export const verifyIfDataAlreadyExist = async (field, fieldData) => {
    try {

        const usersRef = firestore().collection("users").where(field, "==", fieldData);
        const barbersRef = firestore().collection("barbers").where(field, "==", fieldData);

        const usersData = (await usersRef.get()).docs
        const barbersData = (await barbersRef.get()).docs

        if (usersData.length !== 0) return true;
        if (barbersData.length !== 0) return true;

        return false;
    } catch ({ message }) {
        handleError("verifyIfDataAlreadyExist", message)
    }
}
