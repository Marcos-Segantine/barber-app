import firestore from '@react-native-firebase/firestore';
import {
  getMonth,
  getDay,
  getProfessional,
  getHour,
} from '../helpers/dateHelper';
import {verifySchedules} from './verifySchedules';

export const addScheduleWhenDayNotUse = async (
  userData,
  navigation,
  shedulesUser,
) => {
  console.log('addScheduleWhenDayNotUse CALLED');

  const scheduleMonth = getMonth(shedulesUser);
  const scheduleDay = getDay(shedulesUser);
  const scheduleHour = getHour(shedulesUser);
  const scheduleProfessional = getProfessional(shedulesUser);

  try {
    const schedulesMonthRef = firestore()
      .collection('schedules_month')
      .doc(`${scheduleMonth}_2023`);
    const schedulesMonthDoc = await schedulesMonthRef.get();
    const schedulesMonthData = schedulesMonthDoc.data();

    await schedulesMonthRef.update({
      ...schedulesMonthData,
      [scheduleDay]: {
        [scheduleProfessional]: {
          [scheduleHour]: {...shedulesUser},
        },
      },
    });

    const unavailableTimesRef = firestore()
      .collection('unavailable_times')
      .doc(`${scheduleMonth}_2023`);
    const unavailableTimesDoc = await unavailableTimesRef.get();
    let unavailableTimesData = unavailableTimesDoc.data() || {};

    if (!unavailableTimesData[scheduleDay]) {
      unavailableTimesData = {
        ...unavailableTimesData,
        [scheduleDay]: {
          [scheduleProfessional]: [`${shedulesUser.shedule}`],
        },
      };
    } else {
      unavailableTimesData[scheduleDay][scheduleProfessional]
        ? unavailableTimesData[scheduleDay][scheduleProfessional].push(
            `${shedulesUser.shedule}`,
          )
        : (unavailableTimesData[scheduleDay] = {
            ...unavailableTimesData[scheduleDay],
            [scheduleProfessional]: [`${shedulesUser.shedule}`],
          });
    }

    await unavailableTimesRef.set(unavailableTimesData);

    console.log('unavailable_times updated!!');

    verifySchedules(shedulesUser);

    const schedulesByUserRef = firestore()
      .collection('schedules_by_user')
      .doc(userData.uid);
    const schedulesByUserDoc = await schedulesByUserRef.get();
    const schedulesByUserData = schedulesByUserDoc.data();

    await schedulesByUserRef.update({
      schedules: [...schedulesByUserData.schedules, {...shedulesUser}],
    });

    console.log('schedules_by_user UPDATED!!');

    navigation.navigate('FinalScreen');
  } catch (error) {
    console.error('Error adding schedule:', error);
  }
};
