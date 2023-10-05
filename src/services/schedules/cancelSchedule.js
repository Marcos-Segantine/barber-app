/**
 * Cancels a schedule for the user.
 *
 * @param {string} userUid - The UID of the user.
 * @param {Object} scheduleInfo - The information about the schedule to cancel.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 */

import firestore from '@react-native-firebase/firestore';

import { getYear, getDay, getMonth } from '../../utils/dateHelper';

import { handleError } from '../../handlers/handleError';

export const cancelSchedule = async (
  userUid,
  scheduleInfo,
  setSomethingWrong
) => {

  try {

    const scheduleMonth = getMonth(scheduleInfo);
    const scheduleYear = getYear(scheduleInfo)
    const scheduleDay = getDay(scheduleInfo);
    const professional = scheduleInfo.professionalUid;

    const nameDocMonth_Year = `${scheduleMonth}_${scheduleYear}`

    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(userUid);
    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);
    const schedulesUidRef = firestore().collection('schedules_uid').doc(nameDocMonth_Year);

    const batch = firestore().batch();

    const schedulesByUserData = (await schedulesByUserRef.get()).data()
    const schedulesByUser = schedulesByUserData.schedules || [];

    // Remove the schedule that the user wants to cancel
    const newSchedules = schedulesByUser.filter(
      itemFilter => itemFilter.scheduleUid !== scheduleInfo.scheduleUid,
    );

    // Get all schedules in the month and delete the schedule selected by user
    const schedulesMonthData = (await schedulesMonthRef.get()).data()
    delete schedulesMonthData[scheduleDay]?.[professional]?.[scheduleInfo.schedule];

    // Get all unavailable days
    const unavailableTimesData = (await unavailableTimesRef.get()).data()
    const unavailableData = unavailableTimesData;

    // Filter the unavailable days to remove the selected schedule and make it available for other clients
    const newData =
      unavailableData[scheduleDay]?.[professional]?.filter(
        schedule => schedule !== scheduleInfo.schedule,
      ) || [];

    unavailableData[scheduleDay][professional] = newData;

    // Get and update the schedules_uid
    const schedulesUidData = (await schedulesUidRef.get()).data().schedules
    const schedulesUidUpdated = schedulesUidData.filter(scheduleUid => scheduleUid !== scheduleInfo.scheduleUid);

    batch.update(schedulesByUserRef, { schedules: newSchedules });
    batch.update(schedulesMonthRef, schedulesMonthData);
    batch.update(unavailableTimesRef, unavailableData);
    batch.update(schedulesUidRef, { schedules: [...schedulesUidUpdated] });

    await batch.commit();

  } catch ({ message }) {
    setSomethingWrong(true);
    handleError("cancelSchedule", message);
  }
};
