/**
 * Renders the header screens component.
 *
 * @param {string} screenName - The name of the screen.
 * @returns {JSX.Element} - The rendered component.
 */

import { useContext, useEffect } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";

import { globalStyles } from "../assets/globalStyles";

import { SomethingWrongContext } from "../context/SomethingWrongContext";
import { UserContext } from "../context/UserContext";

import { SomethingWrong } from "./modals/SomethingWrong";

import { useNavigation } from '@react-navigation/native';

import { getPreviousScreensName } from "../utils/getPreviousScreensName";

import { handleNavigation } from "../handlers/handleNavigation";

export const HeaderScreens = ({ screenName }) => {
  const { somethingWrong, setSomethingWrong } = useContext(SomethingWrongContext)
  const { userData } = useContext(UserContext)

  const navigation = useNavigation();

  useEffect(() => {
    // Add a hardware back press event listener
    BackHandler.addEventListener('hardwareBackPress', () => {
      const [previousScreen, lastScreen] = getPreviousScreensName(navigation)
      return handleNavigation(previousScreen, lastScreen, navigation, userData)
    })

  }, [])

  return (
    <View style={styles.container}>
      <SomethingWrong
        somethingWrongVisible={somethingWrong}
        setSomethingWrongVisible={setSomethingWrong}
      />

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
    width: "100%",
    paddingRight: 15,
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
