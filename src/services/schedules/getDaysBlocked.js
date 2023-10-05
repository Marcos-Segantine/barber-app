import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const getDaysBlocked = async (professionalUid) => {
    try {

        const daysBlockedRef = firestore().collection('days_blocked').doc(professionalUid);
        const daysBlockedData = (await daysBlockedRef.get()).data();

        if (daysBlockedData === undefined) return {};
        return daysBlockedData;
    } catch ({ message }) {
        handleError("getDaysBlocked", message);
    }
}