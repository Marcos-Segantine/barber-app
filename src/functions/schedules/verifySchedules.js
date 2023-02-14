import firestore from '@react-native-firebase/firestore';
import {getYear, getMonth, getDay, getProfessional} from '../helpers/dateHelper';

export const verifySchedules = async shedulesUser => {
  const year = getYear(shedulesUser);
  const month = getMonth(shedulesUser);
  const day = getDay(shedulesUser);
  const professional = getProfessional(shedulesUser);
  const date = new Date(shedulesUser.day);
  const dayOfSchedule = date.getDay() + 1;
  const weekDay =
    dayOfSchedule > 0 && dayOfSchedule <= 5 ? 0 : dayOfSchedule === 6 ? 1 : 2;

  const workingHourDoc = await firestore().collection('working_hours').get();
  const workingHour = workingHourDoc._docs[weekDay]._data.times;

  const unavailableTimesDoc = await firestore()
    .collection('unavailable_times')
    .doc(`${month}_${year}`)
    .get();
  const unavailableTimes = unavailableTimesDoc._data;

  if (unavailableTimes[day][professional].length === workingHour.length) {
    const deniedDaysDoc = await firestore()
      .collection('denied_days')
      .doc(`${month}_${year}`)
      .get();
    const deniedDays = deniedDaysDoc._data;

    await firestore()
      .collection('denied_days')
      .doc(`${month}_${year}`)
      .set({
        ...deniedDays,
        [`2023-${month}-${day}`]: {
          disableTouchEvent: true,
          disabled: true,
        },
      });
  } else if (
    unavailableTimes[day][professional].length ===
    workingHour.length - 1
  ) {
    const deniedDaysDoc = await firestore()
      .collection('denied_days')
      .doc(`${month}_${year}`)
      .get();
    const deniedDays = deniedDaysDoc._data;

    delete deniedDays[shedulesUser.day].disableTouchEvent;
    delete deniedDays[shedulesUser.day].disabled;

    await firestore()
      .collection('denied_days')
      .doc(`${month}_${year}`)
      .update(deniedDays);
  }
};
