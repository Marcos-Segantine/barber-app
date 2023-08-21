/**
 * Verifies if already exists a schedule with the same schedule UID.
 * If exists, means that the schedule with the given day, hour and professional is not available, so return `false`.
 * Otherwise, return `true`.
 * 
 * @param {string} scheduleMonth - The schedule month.
 * @param {string} scheduleUid - The schedule UID to verify.
 * @returns {boolean} - True if the schedule UID is valid, false otherwise.
 */

import firestore from '@react-native-firebase/firestore';

export const verifySchedulesUid = async (scheduleMonth, scheduleUid) => {
    const schedulesUidRef = firestore().collection('schedules_uid').doc(scheduleMonth)
    const schedulesUidData = (await schedulesUidRef.get()).data()

    // If the schedules UID document does not exist
    // Just return `true` because the schedule is available
    if (schedulesUidData === undefined) return true

    const scheduleUidFormatted = scheduleUid.split('-').slice(1, 6).join('-')

    // Check if the schedule UID is included in the 'schedules' from `schedulesUidData`
    // If it exist means that the schedule is not available more
    if (schedulesUidData.schedules.includes(scheduleUidFormatted)) return false

    // If the given schedule UID is not included in the 'schedules' from `schedulesUidData`, the schedule is available
    return true
}
