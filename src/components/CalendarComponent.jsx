import React, { useContext, useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import _ from "lodash";

import { getWidthHeightScreen } from "../utils/getWidthHeightScreen";
import { getWeekdayFromMonth } from "../utils/getWeekdayFromMonth";
import { getMonth, getYear } from "../utils/dateHelper";

import { ScheduleContext } from "../context/ScheduleContext";
import { SomethingWrongContext } from "../context/SomethingWrongContext";
import { AppSettingsContext } from "../context/AppSettings";

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

interface CalendarComponentProps {
  preferProfessional: boolean;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({ preferProfessional }) => {
  const [daysBlocked, setDaysBlocked] = useState<Record<string, any> | null>(null);
  const [lastMonthSelected, setLastMonthSelected] = useState<string | null>(null);
  const [weekdaysBlocked, setWeekdaysBlocked] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { schedule, setSchedule } = useContext(ScheduleContext);
  const { setSomethingWrong } = useContext(SomethingWrongContext);
  const { settings } = useContext(AppSettingsContext);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`;
  const day = new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`;

  LocaleConfig.defaultLocale = "pt-br";

  useEffect(() => {
    (async () => {
      if (preferProfessional === false) return;
      setDaysBlocked(await getDaysBlocked(schedule.professionalUid, setSomethingWrong));
    })();
  }, [preferProfessional]);

  useEffect(() => {
    setIsLoading(true);

    const formatDeniedDays = (data: string[]) => {
      const result: Record<string, any> = {};
      for (const day of data) {
        result[day] = {
          disableTouchEvent: true,
          disabled: true,
        };
      }
      return result;
    };

    if (lastMonthSelected === null) {
      const date = new Date();
      const currentYear = date.getFullYear();
      const currentMonth = date.getMonth() + 1;
      const monthFormatted = currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString();

      const data: string[][] = [];

      for (const weekday of settings.blockedWeekdays || []) {
        data.push(getWeekdayFromMonth(weekday, monthFormatted, currentYear));

        const result: string[] = [];
        for (const dates of data) {
          for (const day of dates) {
            const dayFormatted = day < 10 ? `0${day}` : day.toString();
            result.push(`${currentYear}-${monthFormatted}-${dayFormatted}`);
          }
        }
        setWeekdaysBlocked(formatDeniedDays(result));
      }
      setIsLoading(false);
    } else {
      const data: string[][] = [];
      for (const weekday of settings.blockedWeekdays || []) {
        data.push(getWeekdayFromMonth(weekday, getMonth(lastMonthSelected), getYear(lastMonthSelected)));

        const result: string[] = [];
        for (const dates of data) {
          for (const day of dates) {
            const currentYear = getYear(lastMonthSelected);
            const currentMonth = getMonth(lastMonthSelected);
            const dayFormatted = day < 10 ? `0${day}` : day.toString();
            result.push(`${currentYear}-${currentMonth}-${dayFormatted}`);
          }
        }
        setWeekdaysBlocked(formatDeniedDays(result));
      }
      setIsLoading(false);
    }
  }, [lastMonthSelected]);

  const deniedDay = preferProfessional || { [`${year}-${month}-${day}`]: { disabled: true, disableTouchEvent: true } };

  const markedDatesCalendar: Record<string, any> = {
    ...deniedDay,
    ...daysBlocked,
    ...weekdaysBlocked,
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

  const styleCalendar = {
    width: getWidthHeightScreen("width", null, setSomethingWrong) - 20,
    padding: 5,
    borderRadius: 20,
  };

  const handleDayPress = useCallback(
    _.debounce((day) => {
      setSchedule({ ...schedule, day: day });
    }, 500),
    [schedule.schedule, schedule.professionalUid]
  );

  return (
    <>
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.text}>Escolha um dia</Text>
        <Text style={[styles.text, { color: globalStyles.orangeColor, fontWeight: "bold" }]}> 2 / 3</Text>
      </View>
      <Calendar
        context={{ date: "" }}
        minDate={String(new Date())}
        markedDates={markedDatesCalendar}
        onDayPress={(day) => handleDayPress(day.dateString)}
        onMonthChange={(month) => setLastMonthSelected(month.dateString)}
        style={styleCalendar}
        theme={themeCalendar}
        displayLoadingIndicator={isLoading}
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
