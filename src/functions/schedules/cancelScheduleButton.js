import { verifySchedules } from './verifySchedules';
import { getDay, getMonth, getProfessional } from '../helpers/dateHelper';
import firestore from '@react-native-firebase/firestore';

export const cancelScheduleButton = async (userData, item, navigation) => {
  const scheduleMonth = getMonth(item);
  const scheduleDay = getDay(item);
  const professional = getProfessional(item);

  try {

    // collections reference
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(userData.uid);
    const schedulesMonthRef = firestore().collection('schedules_month').doc(`${scheduleMonth}_2023`);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(`${scheduleMonth}_2023`);

    const batch = firestore().batch();

    const schedulesByUserData = (await schedulesByUserRef.get()).data()
    const schedulesByUser = schedulesByUserData.schedules || [];

    // remove the schedule that user want
    const newSchedules = schedulesByUser.filter(
      itemFilter => itemFilter.scheduleUid !== item.scheduleUid,
    );

    // get all schedules in the month and delete the schedule selected
    const schedulesMonthData = (await schedulesMonthRef.get()).data()
    delete schedulesMonthData[scheduleDay]?.[professional]?.[item.shedule];

    // get all unavailable days
    const unavailableTimesData = (await unavailableTimesRef.get()).data()
    const unavailableData = unavailableTimesData;

    // filtering unavailable days to remove that that select by client, and make it free (makes possible other client get this schedule)
    const newData =
      unavailableData[scheduleDay]?.[professional]?.filter(
        schedule => schedule !== item.shedule,
      ) || [];

    unavailableData[scheduleDay][professional] = newData;


    batch.update(schedulesByUserRef, { schedules: newSchedules });
    batch.update(schedulesMonthRef, schedulesMonthData);
    batch.update(unavailableTimesRef, unavailableData);

    await batch.commit();

    await verifySchedules(item, 'removeSchedule');
    navigation.navigate('InitialScreen');

  } catch (error) {
    console.log('Error cancelling schedule: ', error);
  }
};
