import firestore from '@react-native-firebase/firestore';
import {
  getYear,
  getMonth,
  getDay,
  getProfessional,
} from '../helpers/dateHelper';

const DAYS_OF_WEEK = ['weekday', 'saturday', 'sunday'];

const cache = {};

export const verifySchedules = async schedulesUser => {
  const year = getYear(schedulesUser);
  const month = getMonth(schedulesUser);
  const day = getDay(schedulesUser);
  const professional = getProfessional(schedulesUser);
  const date = new Date(schedulesUser.day);
  const dayOfSchedule = date.getDay() + 1;
  const weekDay = DAYS_OF_WEEK[dayOfSchedule > 5 ? dayOfSchedule - 5 : 0];

  let workingHour, unavailableTimes, deniedDays;

  if (cache[weekDay]) {
    workingHour = cache[weekDay].workingHour;
  } else {
    const workingHourDoc = firestore().collection('working_hours').doc(weekDay);
    const doc = await workingHourDoc.get();
    workingHour = doc.data().times;
    cache[weekDay] = {workingHour};
  }

  if (cache[`${month}_${year}`]) {
    unavailableTimes = cache[`${month}_${year}`].unavailableTimes;
  } else {
    const unavailableTimesDoc = firestore()
      .collection('unavailable_times')
      .doc(`${month}_${year}`);
    const doc = await unavailableTimesDoc.get();
    unavailableTimes = doc.data();
    cache[`${month}_${year}`] = {unavailableTimes};
  }

  if (cache[`${month}_${year}`]) {
    deniedDays = cache[`${month}_${year}`].deniedDays;
  } else {
    const deniedDaysDoc = firestore()
      .collection('denied_days')
      .doc(`${month}_${year}`);
    const doc = await deniedDaysDoc.get();
    deniedDays = doc.data();
    cache[`${month}_${year}`] = {deniedDays};
  }

  const batch = firestore().batch();

  if (unavailableTimes[day][professional].length === workingHour.length) {
    deniedDays[`2023-${month}-${day}`] = {
      disableTouchEvent: true,
      disabled: true,
    };

    const deniedDaysDocRef = firestore()
      .collection('denied_days')
      .doc(`${month}_${year}`);
    batch.update(deniedDaysDocRef, deniedDays);
  } else if (
    unavailableTimes[day][professional].length ===
    workingHour.length - 1
  ) {
    delete deniedDays[schedulesUser.day].disableTouchEvent;
    delete deniedDays[schedulesUser.day].disabled;

    const deniedDaysDocRef = firestore()
      .collection('denied_days')
      .doc(`${month}_${year}`);
    batch.update(deniedDaysDocRef, deniedDays);
  }

  await batch.commit();
};
