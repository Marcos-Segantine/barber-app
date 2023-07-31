import firestore from '@react-native-firebase/firestore';

export const sendScheduleUidToDB = async (scheduleMonth, scheduleUid) => {
    const schedulesUidRef = firestore().collection('schedules_uid').doc(scheduleMonth)
    const schedulesUidData = (await schedulesUidRef.get()).data()

    const scheduleUidFormatted = scheduleUid.split('-').slice(1, 6).join('-')
 
    if (schedulesUidData === undefined) {
        schedulesUidRef.set({ schedules: [scheduleUidFormatted] })

        return
    }

    const currentSchedules = schedulesUidData.schedules
    const schedulesUiUpdated = [...currentSchedules, scheduleUidFormatted]

    schedulesUidRef.set({ schedules: [...schedulesUiUpdated] })
}
