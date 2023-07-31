import firestore from '@react-native-firebase/firestore';

export const verifySchedulesUid = async (scheduleMonth, scheduleUid) => {
    const schedulesUidRef = firestore().collection('schedules_uid').doc(scheduleMonth)
    const schedulesUidData = (await schedulesUidRef.get()).data()

    if (schedulesUidData === undefined) return true

    const scheduleUidFormatted = scheduleUid.split('-').slice(1, 6).join('-')

    if (schedulesUidData.schedules.includes(scheduleUidFormatted)) return false

    return true
}