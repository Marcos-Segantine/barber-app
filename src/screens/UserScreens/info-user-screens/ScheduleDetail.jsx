import { Text, StyleSheet, View } from "react-native";

import { Header } from "../../../shared/Header";
import { Footer } from "../../../shared/Footer";

import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";

import firestore from "@react-native-firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export const ScheduleDetail = ({ route, navigation }) => {
  const { item } = route.params;

  const { userData, setUserData } = useContext(UserContext);

  const dateFormated = item.day.split("-").reverse().join("/");
  const sheduleMouth = item.day?.split("").slice(5, 7).join("");
  const scheduleDay = item.day.split('').slice(8).join('')
  const professional = item.professional;

  const cancelScheduleButton = () => {
    firestore()
      .collection("schedules_by_user")
      .doc(userData.uid)
      .get()
      .then(({ _data }) => {
        const newSchedules__Temp = _data.schedules.filter(itemFilter => {
          return itemFilter.day !== item.day && itemFilter.shedule !== item.shedule
        })

        _data.schedules = newSchedules__Temp

        firestore()
          .collection("schedules_by_user")
          .doc(userData.uid)
          .update({..._data})
      })

      firestore()
        .collection("schedules_month")
        .doc(`${sheduleMouth}_2023`)
        .get()
        .then(({ _data }) => {
          delete _data[scheduleDay][professional][item.shedule]

          firestore()
            .collection("schedules_month")
            .doc(`${sheduleMouth}_2023`)
            .update({..._data})
        })
      
        firestore()
          .collection("unavailable_times")
          .doc(`${sheduleMouth}_2023`)
          .get()
          .then(({ _data }) => {

            const newData = _data[scheduleDay][professional].filter(schedule => {
              return schedule !== item.shedule
            })

            _data[scheduleDay][professional] = newData
           
            firestore()
              .collection("unavailable_times")
              .doc(`${sheduleMouth}_2023`)
              .update({..._data})
              .then(() => {
                navigation.navigate("InitialScreen")
              })
          })
  };

  return (
    <View style={style.container}>
      <Header />

      <Title title={dateFormated} />

      <View style={style.content}>
        <Text style={style.info}>Dia: {dateFormated}</Text>
        <Text style={style.info}>Horario: {item.shedule}</Text>
        <Text style={style.info}>Serviço: {item.service}</Text>
        <Text style={style.info}>Barbeiro: {item.professional}</Text>
      </View>

      <Button text="Cancelar Horario" action={cancelScheduleButton} />

      <Footer />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    flex: 1,
    alignItems: "center",
  },

  content: {
    marginTop: 25,
    width: "100%",
    alignItems: "center",
  },

  info: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 15,
    borderWidth: 3,
    borderColor: "#E95401",
    width: "80%",
    textAlign: "center",
    borderRadius: 20,
    paddingVertical: 15,
  },
});
