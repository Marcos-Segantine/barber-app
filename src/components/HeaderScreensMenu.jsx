import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";

import { globalStyles } from "../assets/globalStyles";

import { SomethingWrongContext } from "../context/SomethingWrongContext";
import { UserContext } from "../context/UserContext";

import { SomethingWrong } from "./modals/SomethingWrong";

import { useNavigation } from '@react-navigation/native';

import { getPreviousScreensName } from "../utils/getPreviousScreensName";

import { handleNavigation } from "../handlers/handleNavigation";
import { Positions } from "react-native-calendars/src/expandableCalendar";

export const HeaderScreensMenu = ({ screenName }) => {
  const { somethingWrong } = useContext(SomethingWrongContext)
  const {userData} = useContext(UserContext)

  const navigation = useNavigation();

  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', () => {
      const [previousScreen, lastScreen] = getPreviousScreensName(navigation)
      return handleNavigation(previousScreen, lastScreen, navigation, userData)
    })

  }, [])

  return (
    <View style={styles.container}>
      <SomethingWrong somethingWrongVisible={somethingWrong} />

      <View
        style={{
          backgroundColor: "#fefefe",
          borderRadius: 100,
          width: 60,
          height: 60,
        }}
      ></View>

      <Text style={styles.text}>{screenName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    signItems: "center",
    width: "90%",
    marginBottom: 50,
    alignItems: "center",
  },

  text: {
    fontSize: globalStyles.fontSizeMedium,
    fontFamily: globalStyles.fontFamilyBold,
    color: "#000000",
    marginLeft: 20,
  },
});
