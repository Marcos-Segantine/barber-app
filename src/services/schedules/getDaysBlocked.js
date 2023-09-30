import firestore from '@react-native-firebase/firestore';

export const getDaysBlocked = async (professionalUid) => {
    const daysBlockedRef = firestore().collection('days_blocked').doc(professionalUid);
    const daysBlockedData = (await daysBlockedRef.get()).data();

    if (daysBlockedData === undefined) return {};
    return daysBlockedData;
}