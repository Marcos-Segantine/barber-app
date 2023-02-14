/*
  This function delete a schedule
*/

import {getMonth} from '../getMonth';
import {getDay} from '../getDay';
import {getProfessional} from '../getProfessional';
import {verifySchedules} from './verifySchedules';
import firestore from '@react-native-firebase/firestore';

export const cancelScheduleButton = async (userData, item, navigation) => {
  const sheduleMouth = getMonth(item);
  const scheduleDay = getDay(item);
  const professional = getProfessional(item);

  try {
    const userDoc = await firestore()
      .collection('schedules_by_user')
      .doc(userData.uid)
      .get();
    const schedulesByUser = userDoc.data()?.schedules || [];

    const newSchedules = schedulesByUser.filter(
      itemFilter => itemFilter.scheduleUid !== item.scheduleUid,
    );

    await userDoc.ref.update({schedules: newSchedules});

    const monthDoc = await firestore()
      .collection('schedules_month')
      .doc(`${sheduleMouth}_2023`)
      .get();
    const monthData = monthDoc.data() || {};

    delete monthData[scheduleDay]?.[professional]?.[item.shedule];

    await monthDoc.ref.update(monthData);

    const unavailableDoc = await firestore()
      .collection('unavailable_times')
      .doc(`${sheduleMouth}_2023`)
      .get();
    const unavailableData = unavailableDoc.data() || {};

    const newData =
      unavailableData[scheduleDay]?.[professional]?.filter(
        schedule => schedule !== item.shedule,
      ) || [];
    unavailableData[scheduleDay][professional] = newData;

    await unavailableDoc.ref.update(unavailableData);
    verifySchedules(item);
    navigation.navigate('InitialScreen');
  } catch (error) {
    console.log('Error cancelling schedule: ', error);
  }
};
