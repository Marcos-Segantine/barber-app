/**
 * Sends the schedule UID to the database for a given schedule information.
 * If the schedules UID document does not exist, it creates a new document with the schedule UID.
 * If the schedules UID document already exists, it appends the schedule UID to the existing list of schedules.
 * 
 * @param {string} scheduleMonth - The month of the schedule.
 * @param {string} scheduleUid - The UID of the schedule.
 */

import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const sendScheduleUidToDB = async (
    scheduleMonth,
    scheduleUid
) => {
    try {

        const schedulesUidRef = firestore().collection('schedules_uid').doc(scheduleMonth)
        const schedulesUidData = (await schedulesUidRef.get()).data()

        if (schedulesUidData === undefined) {
            schedulesUidRef.set({ schedules: [scheduleUid] })

            return
        }

        const currentSchedules = schedulesUidData.schedules
        const schedulesUiUpdated = [...currentSchedules, scheduleUid]

        schedulesUidRef.set({ schedules: [...schedulesUiUpdated] })
    } catch ({ message }) {
        handleError("sendScheduleUidToDB", message)
    }
}
