import firestore from '@react-native-firebase/firestore';

import {getDay} from './getDay';
import {getHour} from './getHour';
import {getMonth} from './getMonth';
import {getProfessional} from './getProfessional';

import {clearSchedule} from './clearSchedule';

export const addScheduleWhenDayNotUse = (
  userData,
  navigation,
  shedulesUser,
  setShedulesUser,
) => {
  console.log('addScheduleWhenDayNotUse CALLED THIS ONE');

  const scheduleMouth = getMonth(shedulesUser);
  const scheduleDay = getDay(shedulesUser);
  const scheduleHour = getHour(shedulesUser);
  const scheduleProfessional = getProfessional(shedulesUser);

  firestore()
    .collection('schedules_month')
    .doc(`${scheduleMouth}_2023`)
    .get()
    .then(({_data}) => {
      console.log(_data);

      firestore()
        .collection('schedules_month')
        .doc(`${scheduleMouth}_2023`)
        .update({
          ..._data,
          [scheduleDay]: {
            [scheduleProfessional]: {
              [scheduleHour]: {...shedulesUser},
            },
          },
        })
        .then(() => {
          firestore()
            .collection('unavailable_times')
            .doc(`${scheduleMouth}_2023`)
            .get()
            .then(({_data}) => {
              // Verify if there aree data at the database with this props
              if (!_data[scheduleDay]) {
                _data = {
                  [scheduleDay]: {
                    [scheduleProfessional]: [`${shedulesUser.shedule}`],
                  },
                };

                console.log(_data, '_data');
              } else {
                _data[scheduleDay][scheduleProfessional]
                  ? _data[scheduleDay][scheduleProfessional].push(
                      `${shedulesUser.shedule}`,
                    )
                  : (_data[scheduleDay] = {
                      ..._data[scheduleDay],
                      [scheduleProfessional]: [`${shedulesUser.shedule}`],
                    });
              }

              firestore()
                .collection('unavailable_times')
                .doc(`${scheduleMouth}_2023`)
                .update(_data)
                .then(() => {
                  console.log('unavailable_times updated!!');

                  firestore()
                    .collection('schedules_by_user')
                    .doc(userData.uid)
                    .get()
                    .then(({_data}) => {
                      console.log(_data);

                      _data.schedules.push({...shedulesUser});

                      firestore()
                        .collection('schedules_by_user')
                        .doc(userData.uid)
                        .update(_data)
                        .then(() => {
                          console.log('schedules_by_user UPDATED!!');
                          clearSchedule(shedulesUser, setShedulesUser);
                        });
                    });

                  navigation.navigate('FinalScreen');
                });
            });
        });
    });
};
