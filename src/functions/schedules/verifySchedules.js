import firestore from '@react-native-firebase/firestore';
import {
  getYear,
  getMonth,
  getDay,
  getProfessional,
} from '../helpers/dateHelper';

export const verifySchedules = async (schedulesUser, action) => {
  const year = getYear(schedulesUser);
  const month = getMonth(schedulesUser);
  const day = getDay(schedulesUser);
  const professional = getProfessional(schedulesUser);

  const date = new Date(schedulesUser.day);
  const dayOfSchedule = date.getDay() + 1;
  const weekDay = dayOfSchedule <= 5 ? 2 : dayOfSchedule - 6

  const nameDocMonthYear = `${month}_${year}`

  // getting collections reference
  const workingHoursRef = firestore().collection('working_hours');
  const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonthYear);
  const deniedDaysRef = firestore().collection('denied_days').doc(nameDocMonthYear);

  const workingHourDocs = await workingHoursRef.get();
  const workingHoursData = workingHourDocs._docs[weekDay]._data;

  // data to see if must to block the day select, put in denied_days collection
  const unavailableTimesData = (await unavailableTimesRef.get()).data();
  const unavailableTimesByProfessional = unavailableTimesData[day][professional];

  // getting the current data in database
  const deniedDaysData = (await deniedDaysRef.get()).data();

  if (
    unavailableTimesByProfessional.length ===
    workingHoursData.times.length - 1 &&
    action === 'addSchedule'
  ) {

    // increment day on data, updating denied_days colletions
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

    const dayToRemoveIndex = deniedDaysData[day][professional].indexOf(
      Object.keys(dayToRemove),
    );

    deniedDaysData[day][professional].splice(dayToRemoveIndex, 1);
    deniedDaysRef.update(deniedDaysData);
  }
};
