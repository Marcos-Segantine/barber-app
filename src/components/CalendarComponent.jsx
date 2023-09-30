/**
 * Renders a calendar component.
 * @param {boolean} preferProfessional - Flag indicating if professional calendar is preferred.
 * @returns {JSX.Element} - The rendered calendar component.
 */

import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { ScheduleContext } from "../context/ScheduleContext";

import { Calendar, LocaleConfig } from "react-native-calendars";

import { globalStyles } from "../assets/globalStyles";

import _ from "loadsh";
import { getDaysBlocked } from "../services/schedules/getDaysBlocked";

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
  const [daysBlocked, setDaysBlocked] = useState(null);

  const { schedule, setSchedule } = useContext(ScheduleContext);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`;
  const day = new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`;

  LocaleConfig.defaultLocale = "pt-br";

  useEffect(() => {

    (async () => {

      if (preferProfessional === false) return
      setDaysBlocked(await getDaysBlocked(schedule.professionalUid));

    })();

  }, [preferProfessional])

  const deniedDay = preferProfessional || { [`${year}-${month}-${day}`]: { disabled: true, disableTouchEvent: true } };

  // Set the marked dates for the calendar
  const markedDatesCalendar = {
    ...deniedDay,
    ...daysBlocked,
    [schedule.day]: {
      selected: true,
      marked: true,
      selectedColor: globalStyles.orangeColor,
    },
  };

  const themeCalendar = {
    calendarBackground: globalStyles.champagneColor,
    todayTextColor: globalStyles.orangeColor,
    dayTextColor: "#000000",
    selectedDayTextColor: globalStyles.champagneColor,
    selectedDayBackgroundColor: "#000000",
    textDisabledColor: "#00000040",
    textSectionTitleColor: "#000000",
    arrowColor: "#000000",
    monthTextColor: "#000000",
    textDayFontFamily: globalStyles.fontFamilyBold,
    textMonthFontFamily: globalStyles.fontFamilyBold,
    textDayHeaderFontFamily: globalStyles.fontFamilyBold,
  };

  const { width } = Dimensions.get('screen')

  const styleCalendar = {
    width: width - 20,
    padding: 5,
    borderRadius: 20,
  };

  const handleDayPress = useCallback(
    _.debounce(day => {
      setSchedule({ ...schedule, day: day })
    }, 500),
    [schedule.schedule, schedule.professionalUid]
  );

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
        onDayPress={(day) => handleDayPress(day.dateString)}
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
