import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getDay } from "./getDay";
import { getHour } from "./getHour";
import { getMonth } from "./getMonth";
import { getProfessional } from "./getProfessional";

export const addScheduleWhenDayAlredyUse = (_data, navigation, userData, shedulesUser) => {
  console.log("addScheduleWhenDayAlredyUse CALLED THIS ONE");

  const scheduleMouth = getMonth(shedulesUser)
  const scheduleDay = getDay(shedulesUser)
  const scheduleHour = getHour(shedulesUser)
  const scheduleProfessional = getProfessional(shedulesUser)

  _data[scheduleDay][scheduleProfessional]
      ? (_data[scheduleDay][scheduleProfessional] = {
          ..._data[scheduleDay][scheduleProfessional],
          [scheduleHour]: { ...shedulesUser },
        })
      : (_data[scheduleDay] = {
          ..._data[scheduleDay],
          [scheduleProfessional]: {
            [shedulesUser.shedule]: { ...shedulesUser },
          },
        });

    firestore()
      .collection("schedules_month")
      .doc(`${scheduleMouth}_2023`)
      .update(_data)
      .then(() => {
        firestore()
          .collection("unavailable_times")
          .doc(`${scheduleMouth}_2023`)
          .get()
          .then(({ _data }) => {
            console.log(
              _data[scheduleDay][scheduleProfessional],
              "_data[scheduleDay][scheduleProfessional]"
            );
            _data[scheduleDay][scheduleProfessional]
              ? _data[scheduleDay][scheduleProfessional].push(
                  `${shedulesUser.shedule}`
                )
              : (_data[scheduleDay] = {
                  ..._data[scheduleDay],
                  [scheduleProfessional]: [`${shedulesUser.shedule}`],
                });

            firestore()
              .collection("unavailable_times")
              .doc(`${scheduleMouth}_2023`)
              .update(_data)
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
      });
  };