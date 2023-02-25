import firestore from '@react-native-firebase/firestore';

import {
  getMonth,
  getDay,
  getProfessional,
  getHour,
  getYear,
} from '../helpers/dateHelper';

import {clearSchedule} from './clearSchedule';

export const addScheduleWhenMonthIsNotUse = (
  userData,
  navigation,
  schedulesUser,
  setSchedulesUser,
) => {
  console.log('addScheduleWhenMonthIsNotUse CALLED');

  const scheduleMonth = getMonth(schedulesUser);
  const scheduleHour = getHour(schedulesUser);
  const scheduleDay = getDay(schedulesUser);
  const scheduleYear = getYear(schedulesUser);
  const scheduleProfessional = getProfessional(schedulesUser);

  const batch = firestore().batch();

  const deniedDaysRef = firestore().collection('denied_days');
  deniedDaysRef.doc(`${scheduleMonth}_${scheduleYear}`).set({
    [scheduleDay]: {
      ['Barbeiro 1']: [],
      ['Barbeiro 2']: [],
      ['Barbeiro 3']: [],
    },
  });

  // Add schedule to schedules_month collection
  const schedulesMonthRef = firestore()
    .collection('schedules_month')
    .doc(`${scheduleMonth}_2023`);
  const scheduleMonthData = {
    [scheduleDay]: {
      [scheduleProfessional]: {
        [scheduleHour]: {...schedulesUser},
      },
    },
  };
  batch.set(schedulesMonthRef, scheduleMonthData);

  // Add schedule to unavailable_times collection
  const unavailableTimesRef = firestore()
    .collection('unavailable_times')
    .doc(`${scheduleMonth}_2023`);
  const unavailableTimesData = {
    [scheduleDay]: {
      [scheduleProfessional]: [schedulesUser.shedule],
    },
  };
  batch.set(unavailableTimesRef, unavailableTimesData);

  // Add schedule to schedules_by_user collection
  const schedulesByUserRef = firestore()
    .collection('schedules_by_user')
    .doc(userData.uid);
  batch.update(schedulesByUserRef, {
    schedules: firestore.FieldValue.arrayUnion({...schedulesUser}),
  });

  batch
    .commit()
    .then(() => {
      console.log('SCHEDULES UPDATED!!');
      clearSchedule(schedulesUser, setSchedulesUser);
      navigation.navigate('FinalScreen');
    })
    .catch(error => {
      console.error('Error updating schedules:', error);
    });
};
