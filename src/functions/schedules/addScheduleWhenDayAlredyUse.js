import firestore from '@react-native-firebase/firestore';

import {
  getMonth,
  getDay,
  getProfessional,
  getHour,
} from '../helpers/dateHelper';

import {verifySchedules} from './verifySchedules';

export const addScheduleWhenDayAlredyUse = async (
  navigation,
  userData,
  schedule,
) => {
  const scheduleMonth = getMonth(schedule);
  const scheduleDay = getDay(schedule);
  const scheduleHour = getHour(schedule);
  const scheduleProfessional = getProfessional(schedule);

  console.log('addScheduleWhenDayAlredyUse CALLED');

  const schedulesMonthRef = firestore()
    .collection('schedules_month')
    .doc(`${scheduleMonth}_2023`);
  const unavailableTimesRef = firestore()
    .collection('unavailable_times')
    .doc(`${scheduleMonth}_2023`);
  const schedulesByUserRef = firestore()
    .collection('schedules_by_user')
    .doc(userData.uid);

  const batch = firestore().batch();

  const schedulesMonthSnapshot = await schedulesMonthRef.get();
  const schedulesMonthData = schedulesMonthSnapshot.data();

  if (schedulesMonthData[scheduleDay]?.[scheduleProfessional]) {
    const existingSchedule =
      schedulesMonthData[scheduleDay][scheduleProfessional][scheduleHour];
    if (existingSchedule) {
      throw new Error(
        'There is already a schedule at the same time for this professional.',
      );
    }
    batch.update(schedulesMonthRef, {
      [`${scheduleDay}.${scheduleProfessional}.${scheduleHour}`]: schedule,
    });
  } else {
    batch.set(
      schedulesMonthRef,
      {
        [`${scheduleDay}.${scheduleProfessional}`]: {
          [scheduleHour]: schedule,
        },
      },
      {merge: true},
    );
  }

  const unavailableTimesSnapshot = await unavailableTimesRef.get();
  const unavailableTimesData = unavailableTimesSnapshot.data();

  if (unavailableTimesData[scheduleDay]?.[scheduleProfessional]) {
    batch.update(unavailableTimesRef, {
      [`${scheduleDay}.${scheduleProfessional}`]:
        firestore.FieldValue.arrayUnion(schedule.shedule),
    });
  } else {
    batch.set(
      unavailableTimesRef,
      {
        [`${scheduleDay}.${scheduleProfessional}`]: [schedule.shedule],
      },
      {merge: true},
    );
  }

  await verifySchedules(schedule, 'addSchedule');

  const schedulesByUserSnapshot = await schedulesByUserRef.get();
  const schedulesByUserData = schedulesByUserSnapshot.data();
  const updatedSchedulesByUser = {
    schedules: [...schedulesByUserData.schedules, schedule],
  };
  batch.update(schedulesByUserRef, updatedSchedulesByUser);

  await batch.commit();

  navigation.navigate('FinalScreen');
};
