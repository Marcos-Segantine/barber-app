/**
 * Sends the schedule UID to the database for a given schedule information.
 * If the schedules UID document does not exist, it creates a new document with the schedule UID.
 * If the schedules UID document already exists, it appends the schedule UID to the existing list of schedules.
 * 
 * @param {string} scheduleMonth - The month of the schedule.
 * @param {string} scheduleUid - The UID of the schedule.
 */

import firestore from '@react-native-firebase/firestore';

export const sendScheduleUidToDB = async (
    scheduleMonth,
    scheduleUid
) => {
    const schedulesUidRef = firestore().collection('schedules_uid').doc(scheduleMonth)
    const schedulesUidData = (await schedulesUidRef.get()).data()

    const scheduleUidFormatted = scheduleUid.split('-').slice(1, 6).join('-')

    // Check if the schedules UID document exists
    // If it does not exist, create a new document
    if (schedulesUidData === undefined) {
        schedulesUidRef.set({ schedules: [scheduleUidFormatted] })

        return
    }

    // If the schedules UID document already exists, append the schedule UID to the existing list of schedules
    const currentSchedules = schedulesUidData.schedules
    const schedulesUiUpdated = [...currentSchedules, scheduleUidFormatted]

    schedulesUidRef.set({ schedules: [...schedulesUiUpdated] })
}
