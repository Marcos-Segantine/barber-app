import firestore from '@react-native-firebase/firestore';

import { getYear, getDay, getMonth, getProfessional } from '../../utils/dateHelper';

export const cancelSchedule = async (clientUid, scheduleInfo, setSomethingWrong) => {
  const scheduleMonth = getMonth(scheduleInfo);
  const scheduleYear = getYear(scheduleInfo)
  const scheduleDay = getDay(scheduleInfo);
  const professional = getProfessional(scheduleInfo);

  const nameDocMonth_Year = `${scheduleMonth}_${scheduleYear}`

  try {

    // collections reference
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(clientUid);
    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);
    const schedulesUidRef = firestore().collection('schedules_uid').doc(nameDocMonth_Year);

    const batch = firestore().batch();

    const schedulesByUserData = (await schedulesByUserRef.get()).data()
    const schedulesByUser = schedulesByUserData.schedules || [];

    // remove the schedule that user want
    const newSchedules = schedulesByUser.filter(
      itemFilter => itemFilter.scheduleUid !== scheduleInfo.scheduleUid,
    );

    // get all schedules in the month and delete the schedule selected
    const schedulesMonthData = (await schedulesMonthRef.get()).data()
    delete schedulesMonthData[scheduleDay]?.[professional]?.[scheduleInfo.schedule];


    // get all unavailable days
    const unavailableTimesData = (await unavailableTimesRef.get()).data()
    const unavailableData = unavailableTimesData;

    // filtering unavailable days to remove that was selected by client, and make it free (makes possible other client get this schedule)
    const newData =
      unavailableData[scheduleDay]?.[professional]?.filter(
        schedule => schedule !== scheduleInfo.schedule,
      ) || [];


    unavailableData[scheduleDay][professional] = newData;

    const scheduleUidFormatted = scheduleInfo.scheduleUid.split('-').slice(1, 6).join('-')
    const schedulesUidData = (await schedulesUidRef.get()).data().schedules
    const schedulesUidUpdated = schedulesUidData.filter(scheduleUid => scheduleUid !== scheduleUidFormatted);

    batch.update(schedulesByUserRef, { schedules: newSchedules });
    batch.update(schedulesMonthRef, schedulesMonthData);
    batch.update(unavailableTimesRef, unavailableData);
    batch.update(schedulesUidRef, { schedules: [...schedulesUidUpdated] });

    await batch.commit();

  } catch (error) {
    console.error('Error cancelling schedule: ', error);
    setSomethingWrong(true);
  }
};
