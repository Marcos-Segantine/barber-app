import firestore from '@react-native-firebase/firestore';
import {
  getYear,
  getMonth,
  getDay,
  getProfessional,
} from '../helpers/dateHelper';

const DAYS_OF_WEEK = ['weekday', 'saturday', 'sunday'];

export const verifySchedules = async (schedulesUser, action) => {
  const year = getYear(schedulesUser);
  const month = getMonth(schedulesUser);
  const day = getDay(schedulesUser);
  const professional = getProfessional(schedulesUser);
  const date = new Date(schedulesUser.day);
  const dayOfSchedule = date.getDay() + 1;
  const weekDay = DAYS_OF_WEEK[dayOfSchedule > 5 ? dayOfSchedule - 5 : 0];

  const workingHoursRef = firestore().collection('working_hours').doc(weekDay);
  const unavailableTimesRef = firestore()
    .collection('unavailable_times')
    .doc(`${month}_${year}`);
  const deniedDaysRef = firestore()
    .collection('denied_days')
    .doc(`${month}_${year}`);

  const deniedDaysData = (await deniedDaysRef.get()).data();

  const workingHoursData = (await workingHoursRef.get()).data().times;
  const unavailableTimesData = (await unavailableTimesRef.get()).data();

  const unavailableTimesByProfessional =
    unavailableTimesData[day][professional];

  if (
    unavailableTimesByProfessional.length === workingHoursData.length - 1 &&
    action === 'addSchedule'
  ) {
    deniedDaysData[day][professional].push({
      [schedulesUser.day]: {
        disabled: true,
        disableTouchEvent: true,
      },
    });
    deniedDaysRef.update(deniedDaysData);
  } else if (action === 'removeSchedule') {
    const dayToRemove = deniedDaysData[day][professional].filter(currentDay => {
      return Object.keys(currentDay)[0] === schedulesUser.day;
    });

    console.log(
      dayToRemove,
      '<<< dayToRemove',
      deniedDaysData[day][professional],
      deniedDaysData[day][professional].indexOf(Object.keys(dayToRemove)),
      'INDEX',
    );
    const dayToRemoveIndex = deniedDaysData[day][professional].indexOf(
      Object.keys(dayToRemove),
    );

    deniedDaysData[day][professional].splice(dayToRemoveIndex, 1);

    deniedDaysRef.update(deniedDaysData);
  }
};
