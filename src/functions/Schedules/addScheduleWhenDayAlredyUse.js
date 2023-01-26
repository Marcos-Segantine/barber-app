import firestore from '@react-native-firebase/firestore';

import {getDay} from '../getDay';
import {getHour} from '../getHour';
import {getMonth} from '../getMonth';
import {getProfessional} from '../getProfessional';

import { verifySchedules } from './verifySchedules';

export const addScheduleWhenDayAlredyUse = (
  _data,
  navigation,
  userData,
  shedulesUser,
) => {
  const scheduleMouth = getMonth(shedulesUser);
  const scheduleDay = getDay(shedulesUser);
  const scheduleHour = getHour(shedulesUser);
  const scheduleProfessional = getProfessional(shedulesUser);

  console.log("addScheduleWhenDayAlredyUse CALLED");

  _data[scheduleDay][scheduleProfessional]
    ? (_data[scheduleDay][scheduleProfessional] = {
        ..._data[scheduleDay][scheduleProfessional],
        [scheduleHour]: {...shedulesUser},
      })
    : (_data[scheduleDay] = {
        ..._data[scheduleDay],
        [scheduleProfessional]: {
          [shedulesUser.shedule]: {...shedulesUser},
        },
      });

  firestore()
    .collection('schedules_month')
    .doc(`${scheduleMouth}_2023`)
    .update(_data)
    .then(() => {
      firestore()
        .collection('unavailable_times')
        .doc(`${scheduleMouth}_2023`)
        .get()
        .then(({_data}) => {
          _data[scheduleDay][scheduleProfessional]
            ? _data[scheduleDay][scheduleProfessional].push(
                `${shedulesUser.shedule}`,
              )
            : (_data[scheduleDay] = {
                ..._data[scheduleDay],
                [scheduleProfessional]: [`${shedulesUser.shedule}`],
              });

          firestore()
            .collection('unavailable_times')
            .doc(`${scheduleMouth}_2023`)
            .update(_data)
            .then(() => {
              verifySchedules(shedulesUser)
              firestore()
                .collection('schedules_by_user')
                .doc(userData.uid)
                .get()
                .then(({_data}) => {
                  _data.schedules.push({...shedulesUser});

                  firestore()
                    .collection('schedules_by_user')
                    .doc(userData.uid)
                    .update(_data)
                    .then(() => {});
                });
              navigation.navigate('FinalScreen');
            });
        });
    });
};
