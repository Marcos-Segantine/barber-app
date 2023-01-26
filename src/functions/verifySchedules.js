import firestore from '@react-native-firebase/firestore';

import {getYear} from './getYear';
import {getMonth} from './getMonth';
import {getDay} from './getDay';
import {getProfessional} from './getProfessional';

export const verifySchedules = shedulesUser => {
  // const year = getYear(shedulesUser);
  const month = getMonth(shedulesUser);
  const day = getDay(shedulesUser);

  const professional = getProfessional(shedulesUser);

  console.log(month, "<<<<<<<<<<< month");

  firestore()
    .collection('working_hours')
    .get()
    .then(({_docs}) => {
      console.log(
        'FIX THIS LATER, THE SYSTEM MUST TO KNOW WHEN THE SCHEDULE IS FROM MONDAY TO FRIDAY OR ENDWEEK!!',
      );
      const workingHour = _docs[0]._data.times;

      firestore()
        .collection('unavailable_times')
        .doc(`${month}_2023`)
        .get()
        .then(({_data}) => {
          const unavailableTimes = _data;
          console.log(unavailableTimes, workingHour);
          console.log(unavailableTimes[day][professional].length ===
            workingHour.length - 1, unavailableTimes[day][professional].length,
            workingHour.length - 1, 'unavailableTimes[day][professional].length === workingHour.length - 1');

          if (
            !!unavailableTimes[day][professional] &&
            unavailableTimes[day][professional].length === workingHour.length
          ) {
            firestore()
              .collection('denied_days')
              .doc(`${month}_2023`)
              .get()
              .then(({_data}) => {
                firestore()
                  .collection('denied_days')
                  .doc(`${month}_2023`)
                  .update({
                    ..._data,
                    [`2023-${month}-${day}`]: {
                      disableTouchEvent: true,
                      disabled: true,
                    },
                  });
              });
          } else if (
            unavailableTimes[day][professional].length ===
            workingHour.length - 1
          ) {
            console.log('ELSE IF DENIED DAYS');
            firestore()
              .collection('denied_days')
              .doc(`${month}_2023`)
              .get()
              .then(({_data}) => {
                const deniedDays = _data;
                console.log(deniedDays, ' <<<<<<<<<<<<< deniedDays, BEFORE');
                
                delete deniedDays[shedulesUser.day].disableTouchEvent;
                delete deniedDays[shedulesUser.day].disabled;

                console.log(deniedDays, ' <<<<<<<<<<<<< deniedDays');

                firestore()
                  .collection('denied_days')
                  .doc(`${month}_2023`)
                  .update(deniedDays)
                  .then(() => {
                    console.log('denied_days updated!');
                  });
              });
          }
        });
    });
};
