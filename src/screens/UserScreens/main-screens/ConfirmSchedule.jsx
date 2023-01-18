import { Text, View, StyleSheet } from "react-native";

import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";

import { useContext, useState } from "react";
import { ShedulesUserContext } from "../../../context/ShedulesUser";

import firestore from "@react-native-firebase/firestore";

import { globalStyles } from "../../globalStyles";

import { getMonth } from "../../../functions/getMonth";
import { getDay } from "../../../functions/getDay";

import { addScheduleWhenDayAlredyUse } from '../../../functions/addScheduleWhenDayAlredyUse'
import { addScheduleWhenDayNotUse } from '../../../functions/addScheduleWhenDayNotUse'
import { addScheduleWhenMonthIsNotUse } from '../../../functions/addScheduleWhenMonthIsNotUse'
import { UserContext } from "../../../context/UserContext";

export const ConfirmSchedule = ({ navigation }) => {
  const { shedulesUser } = useContext(ShedulesUserContext);

  const [isAllRight, setIsAllRight] = useState(false);

  const { userData } = useContext(UserContext)

  isAllRight
    ? setTimeout(() => {
        navigation.navigate("FinalScreen");
      }, 100)
    : null;

  const sheduleMouth = getMonth()
  const sheduleDay = getDay()

  const handleComfirm = async () => {
    firestore()
      .collection("schedules_month")
      .doc(`${sheduleMouth}_2023`)
      .get()
      .then(({ _data }) => {
        if (_data === undefined) {
          addScheduleWhenMonthIsNotUse(userData, navigation, shedulesUser);
          return;
        }

        const dayIsAlredyUse = _data[sheduleDay];

        dayIsAlredyUse
          ? (console.log("DAY AND PROFESSIONAL ALREADY USING"),
            addScheduleWhenDayAlredyUse(_data, navigation, userData, shedulesUser))
          : (console.log("DAY AND PROFESSIONAL NOT USE YET"),
            addScheduleWhenDayNotUse(userData, navigation, shedulesUser));
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
