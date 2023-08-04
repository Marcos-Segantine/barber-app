import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { ScheduleContext } from "../context/ScheduleContext";

import { Calendar, LocaleConfig } from "react-native-calendars";

import { globalStyles } from "../assets/globalStyles";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "jan",
    "fev",
    "mar",
    "abr",
    "maio",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Terç", "Qua", "Qui", "Sex", "Sáb"],
};

export const CalendarComponent = ({ preferProfessional }) => {
  LocaleConfig.defaultLocale = "pt-br";

  const { schedule, setSchedule } = useContext(ScheduleContext);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`;
  const day = new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`;

  const deniedDays = preferProfessional || { [`${year}-${month}-${day}`]: { disabled: true, disableTouchEvent: true } };

  const markedDatesCalendar = {
    ...deniedDays,
    [schedule.day]: {
      selected: true,
      marked: true,
      selectedColor: globalStyles.orangeColor,
    },
  };

  const themeCalendar = {
    calendarBackground: "#fff8ef",
    todayTextColor: globalStyles.orangeColor,
    dayTextColor: "#000000",
    selectedDayTextColor: "#fff8ef",
    selectedDayBackgroundColor: "#000000",
    textDisabledColor: "#00000040",
    textSectionTitleColor: "#000000",
    arrowColor: "#000000",
    monthTextColor: "#000000",
    textDayFontFamily: globalStyles.fontFamilyBold,
    textMonthFontFamily: globalStyles.fontFamilyBold,
    textDayHeaderFontFamily: globalStyles.fontFamilyBold,
  };

  const styleCalendar = {
    width: 350,
    padding: 5,
    borderRadius: 20,
  };

  return (
    <>
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.text}>Escolha um dia</Text>
        <Text style={[styles.text, { color: globalStyles.orangeColor, fontWeight: 'bold' }]}> 2 / 3</Text>
      </View>

      <Calendar
        context={{ date: "" }}
        minDate={String(new Date())}
        markedDates={markedDatesCalendar}
        onDayPress={(day) => setSchedule({ ...schedule, day: day.dateString })}
        style={styleCalendar}
        theme={themeCalendar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#000000",
    fontFamily: globalStyles.fontFamilyBold,
    fontSize: globalStyles.fontSizeSmall,
    marginTop: 30,
    marginBottom: 10,
  },
});
