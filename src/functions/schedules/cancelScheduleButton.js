import {verifySchedules} from './verifySchedules';
import {getDay, getMonth, getProfessional} from '../helpers/dateHelper';
import firestore from '@react-native-firebase/firestore';

export const cancelScheduleButton = async (userData, item, navigation) => {
  const scheduleMonth = getMonth(item);
  const scheduleDay = getDay(item);
  const professional = getProfessional(item);

  try {
    const batch = firestore().batch();
    const userDocRef = firestore()
      .collection('schedules_by_user')
      .doc(userData.uid);
    const userDoc = await userDocRef.get();
    const schedulesByUser = userDoc.data()?.schedules || [];

    const newSchedules = schedulesByUser.filter(
      itemFilter => itemFilter.scheduleUid !== item.scheduleUid,
    );

    batch.update(userDocRef, {schedules: newSchedules});

    const monthDocRef = firestore()
      .collection('schedules_month')
      .doc(`${scheduleMonth}_2023`);
    const monthDoc = await monthDocRef.get();
    const monthData = monthDoc.data() || {};

    delete monthData[scheduleDay]?.[professional]?.[item.shedule];

    batch.update(monthDocRef, monthData);

    const unavailableDocRef = firestore()
      .collection('unavailable_times')
      .doc(`${scheduleMonth}_2023`);
    const unavailableDoc = await unavailableDocRef.get();
    const unavailableData = unavailableDoc.data() || {};

    const newData =
      unavailableData[scheduleDay]?.[professional]?.filter(
        schedule => schedule !== item.shedule,
      ) || [];
    unavailableData[scheduleDay][professional] = newData;

    batch.update(unavailableDocRef, unavailableData);

    await batch.commit();
    verifySchedules(item);
    navigation.navigate('InitialScreen');
  } catch (error) {
    console.log('Error cancelling schedule: ', error);
  }
};
