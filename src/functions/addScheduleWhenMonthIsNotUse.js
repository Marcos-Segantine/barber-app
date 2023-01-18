import firestore from "@react-native-firebase/firestore";

import { getDay } from "./getDay";
import { getHour } from "./getHour";
import { getProfessional } from "./getProfessional";
import { getMonth } from '../functions/getMonth'

export const addScheduleWhenMonthIsNotUse = (userData, navigation, shedulesUser) => {
    console.log("addScheduleWhenMonthIsNotUse CALLED THIS ONE");

    const sheduleMouth = getMonth(shedulesUser)
    const scheduleHour = getHour(shedulesUser)
    const scheduleDay = getDay(shedulesUser)
    const scheduleProfessional = getProfessional(shedulesUser)

    firestore()
      .collection("schedules_month")
      .doc(`${sheduleMouth}_2023`)
      .set({
        [scheduleDay]: {
          [scheduleProfessional]: {
            [scheduleHour]: { ...shedulesUser },
          },
        },
      })
      .then(() => {
        console.log("SCHEDULE UPDATED!!");
        firestore()
          .collection("unavailable_times")
          .doc(`${sheduleMouth}_2023`)
          .set({
            [scheduleDay]: {
              [scheduleProfessional]: [`${shedulesUser.shedule}`],
            },
          })
          .then(() => {
            console.log("unavailable_times UPDATED!!");

            firestore()
              .collection("schedules_by_user")
              .doc(userData.uid)
              .get()
              .then(({ _data }) => {
                  console.log(_data);

                  _data.schedules.push({ ...shedulesUser })

                  firestore()
                    .collection("schedules_by_user")
                    .doc(userData.uid)
                    .update(_data)
                    .then(() => {
                      console.log("schedules_by_user UPDATED!!");
                    })
              })

            navigation.navigate("InitialScreen");
          });
      });
  };