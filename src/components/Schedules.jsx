/**
 * Renders the schedules component.
 * 
 * @param {boolean} preferProfessional - Indicates if user prefer professionals or schedules.
 * @returns {JSX.Element} The schedules component.
 */

import { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import { ScheduleContext } from "../context/ScheduleContext";
import { SomethingWrongContext } from "../context/SomethingWrongContext";

import { globalStyles } from "../assets/globalStyles";

import { handleAvailableTimesSchedules } from "../handlers/handleAvailableTimesSchedules";

import { getDay } from "../utils/dateHelper";

import { Loading } from "./Loading";
import { NoProfessionals } from "./NoProfessionals";

import _ from "loadsh"

export const Schedules = ({ preferProfessional }) => {
  const [availableTimes, setAvailableTimes] = useState(null);
  const [allTimes, setAllTimes] = useState(null);

  const { schedule, setSchedule } = useContext(ScheduleContext);
  const { setSomethingWrong } = useContext(SomethingWrongContext);

  // Get the day based on the selected schedule
  const day = schedule.day && getDay(schedule);

  // Fetch available times when professional or day changes
  useEffect(() => {
    handleAvailableTimesSchedules(
      schedule,
      preferProfessional,
      setSomethingWrong,
      setAvailableTimes,
      setAllTimes
    )

  }, [schedule.professional, schedule.day]);

  const handleDayPress = useCallback(
    _.debounce(schedule => {
      setSchedule({ ...schedule, schedule: schedule })
    }, 500),
    []
  );

  // Render loading screen if times is still being fetched
  if (availableTimes === null && allTimes === null) return <Loading />;

  // Render error message if there's not times registered in the database
  else if (availableTimes === undefined || allTimes === undefined) {
    return (
      <View style={{ width: "100%" }}>
        <Text style={[styles.text, { fontSize: globalStyles.fontSizeSmall, textAlign: "center" }]}>
          Até o presente momento não foi cadastrado nenhum horário no sistema, entre em{" "}
          <Text
            style={{ color: globalStyles.orangeColor, fontSize: globalStyles.fontSizeSmall, textDecorationLine: "underline", fontFamily: globalStyles.fontFamilyMedium }}
            onPress={() => { }}
          >
            contato
          </Text>
          {" "}com sua barbearia para mais informações.
        </Text>

        <NoProfessionals />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {
        (availableTimes || allTimes) && (
          <>
            {
              // Render the available times in the selected day
              availableTimes?.length || allTimes?.length ?
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={styles.text}>Escolha um horário</Text>
                  <Text style={[styles.text, { color: globalStyles.orangeColor, fontFamily: globalStyles.fontFamilyBold }]}>{preferProfessional ? "3 / 3" : " 1 / 3"}</Text>
                </View>
                :
                // Render message if there are not available times in the selected day
                <Text style={styles.text}>
                  Infelizmente o {schedule.professional} não tem nenhum horário vago no dia {day}
                </Text>

            }
          </>
        )
      }
      {
        // Render availableTimes or allTimes
        (availableTimes || allTimes).map((time, index) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.schedule,
              schedule.schedule === time && { backgroundColor: globalStyles.orangeColor },
            ]}
            onPress={() => handleDayPress(time)}
            key={index}
          >
            <Text
              style={[
                styles.time,
                schedule.schedule === time && { color: "#FFFFFF" },
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },

  schedule: {
    width: 100,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: globalStyles.orangeColor,
    margin: 2,
  },

  time: {
    color: globalStyles.orangeColor,
    fontFamily: globalStyles.fontFamilyBold,
    fontSize: globalStyles.fontSizeSmall,
  },

  text: {
    color: "#000000",
    fontFamily: globalStyles.fontFamilyBold,
    fontSize: globalStyles.fontSizeSmall,
    marginTop: 30,
    marginBottom: 10,
  },
});
