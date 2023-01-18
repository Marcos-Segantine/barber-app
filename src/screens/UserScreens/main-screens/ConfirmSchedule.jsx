import { Text, View, StyleSheet } from "react-native";

import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";
import { useContext, useState } from "react";
import { ShedulesUserContext } from "../../../context/ShedulesUser";

import firestore from "@react-native-firebase/firestore";

import { globalStyles } from "../../globalStyles";

import { UserContext } from "../../../context/UserContext";

export const ConfirmSchedule = ({ navigation }) => {
  const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext);

  const { userData, setUserData } = useContext(UserContext);

  const [isAllRight, setIsAllRight] = useState(false);

  isAllRight
    ? setTimeout(() => {
        navigation.navigate("FinalScreen");
      }, 100)
    : null;

  const sheduleMouth = shedulesUser?.day?.split("").slice(5, 7).join("");
  const sheduleDay = shedulesUser?.day?.split("").slice(8).join("");
  const sheduleHour = shedulesUser?.shedule;
  const sheduleProfessional = shedulesUser?.professional;

  const addScheduleWhenDayAlredyUse = (_data) => {
    console.log("addScheduleWhenDayAlredyUse CALLED THIS ONE");

    _data[sheduleDay][sheduleProfessional]
      ? (_data[sheduleDay][sheduleProfessional] = {
          ..._data[sheduleDay][sheduleProfessional],
          [sheduleHour]: { ...shedulesUser },
        })
      : (_data[sheduleDay] = {
          ..._data[sheduleDay],
          [sheduleProfessional]: {
            [shedulesUser.shedule]: { ...shedulesUser },
          },
        });

    firestore()
      .collection("schedules_month")
      .doc(`${sheduleMouth}_2023`)
      .update(_data)
      .then(() => {
        firestore()
          .collection("unavailable_times")
          .doc(`${sheduleMouth}_2023`)
          .get()
          .then(({ _data }) => {
            console.log(
              _data[sheduleDay][sheduleProfessional],
              "_data[sheduleDay][sheduleProfessional]"
            );
            _data[sheduleDay][sheduleProfessional]
              ? _data[sheduleDay][sheduleProfessional].push(
                  `${shedulesUser.shedule}`
                )
              : (_data[sheduleDay] = {
                  ..._data[sheduleDay],
                  [sheduleProfessional]: [`${shedulesUser.shedule}`],
                });

            firestore()
              .collection("unavailable_times")
              .doc(`${sheduleMouth}_2023`)
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

  const addScheduleWhenDayNotUse = () => {
    console.log("addScheduleWhenDayNotUse CALLED THIS ONE");

    firestore()
      .collection("schedules_month")
      .doc(`${sheduleMouth}_2023`)
      .get()
      .then(({ _data }) => {
        console.log(_data);

        firestore()
          .collection("schedules_month")
          .doc(`${sheduleMouth}_2023`)
          .update({
            ..._data,
            [sheduleDay]: {
              [sheduleProfessional]: {
                [sheduleHour]: { ...shedulesUser },
              },
            },
          })
          .then(() => {
            firestore()
              .collection("unavailable_times")
              .doc(`${sheduleMouth}_2023`)
              .get()
              .then(({ _data }) => {
                console.log(_data[sheduleDay], "_data");

                // Verify if there aree data at the database with this props
                if (!_data[sheduleDay]) {
                  _data = {
                    [sheduleDay]: {
                      [sheduleProfessional]: [`${shedulesUser.shedule}`],
                    },
                  };

                  console.log(_data, "_data");
                } else {
                  _data[sheduleDay][sheduleProfessional]
                    ? _data[sheduleDay][sheduleProfessional].push(
                        `${shedulesUser.shedule}`
                      )
                    : (_data[sheduleDay] = {
                        ..._data[sheduleDay],
                        [sheduleProfessional]: [`${shedulesUser.shedule}`],
                      });
                }

                firestore()
                  .collection("unavailable_times")
                  .doc(`${sheduleMouth}_2023`)
                  .update(_data)
                  .then(() => {
                    console.log("unavailable_times collection updated!!");


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
      });
  };

  const addScheduleWhenMonthIsNotUse = () => {
    console.log("addScheduleWhenMonthIsNotUse CALLED THIS ONE");

    firestore()
      .collection("schedules_month")
      .doc(`${sheduleMouth}_2023`)
      .set({
        [sheduleDay]: {
          [sheduleProfessional]: {
            [sheduleHour]: { ...shedulesUser },
          },
        },
      })
      .then(() => {
        console.log("SCHEDULE UPDATED!!");
        firestore()
          .collection("unavailable_times")
          .doc(`${sheduleMouth}_2023`)
          .set({
            [sheduleDay]: {
              [sheduleProfessional]: [`${shedulesUser.shedule}`],
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

  const handleComfirm = async () => {
    firestore()
      .collection("schedules_month")
      .doc(`${sheduleMouth}_2023`)
      .get()
      .then(({ _data }) => {
        if (_data === undefined) {
          addScheduleWhenMonthIsNotUse();
          return;
        }

        const dayIsAlredyUse = _data[sheduleDay];

        dayIsAlredyUse
          ? (console.log("DAY AND PROFESSIONAL ALREADY USING"),
            addScheduleWhenDayAlredyUse(_data))
          : (console.log("DAY AND PROFESSIONAL NOT USE YET"),
            addScheduleWhenDayNotUse(_data));
      });
  };

  return (
    <View style={globalStyles.container}>
      <Title title="O seu agendamento:" />

      <Text style={style.subTitle}>Confira todos os dados</Text>

      <View style={style.contentData}>
        <View style={style.data}>
          <Text style={style.textData}>Dia: {shedulesUser.day}</Text>
        </View>

        <View style={style.data}>
          <Text style={style.textData}>Serviço: {shedulesUser.service}</Text>
        </View>

        <View style={style.data}>
          <Text style={style.textData}>Profissional: {shedulesUser.professional}</Text>
        </View>

        <View style={style.data}>
          <Text style={style.textData}>Horário: {shedulesUser.shedule}</Text>
        </View>
      </View>

      <Button text="Confirmar" action={handleComfirm} />
    </View>
  );
};

const style = StyleSheet.create({
  subTitle: {
    fontSize: 12,
    color: "#FFFFFF60",
  },

  contentData: {
    width: "85%",
    marginTop: 30,
  },

  data: {
    borderColor: "#E95401",
    borderRadius: 20,
    borderWidth: 2,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 5,
  },

  textData: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
