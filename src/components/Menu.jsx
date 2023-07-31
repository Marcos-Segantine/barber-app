import { useContext, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import { HomeIcon, HomeIconSelected } from "../assets/icons/HomeIcon";
import {
  SchedulesIcon,
  SchedulesIconSelected,
} from "../assets/icons/Schedules.Icon";
import { ProfileIcon, ProfileIconSelected } from "../assets/icons/ProfileIcon";
import { globalStyles } from "../assets/globalStyles";

import { useNavigation, useNavigationState } from "@react-navigation/native";

import { MenuItemContext } from "../context/MenuItemSelected";
import { SomethingWrongContext } from "../context/SomethingWrongContext";

import { verifyScreenName } from "../handlers/verifyScreenName";

export const Menu = () => {
  const { itemSelected, setItemSelected } = useContext(MenuItemContext);

  const navigation = useNavigation();

  const { setSomethingWrong } = useContext(SomethingWrongContext)

  const stateNavigation = useNavigationState(
    (stateNavigation) => stateNavigation
  );

  useEffect(() => {
    setItemSelected(verifyScreenName(stateNavigation, setSomethingWrong));
  }, [stateNavigation]);

  const handleNavigation = (navigateTo) => {
    navigation.navigate(navigateTo);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ alignItems: "center" }}
        onPress={() => handleNavigation("Home")}
      >
        {itemSelected === "Home" ? <HomeIconSelected /> : <HomeIcon />}
        <Text
          style={
            itemSelected === "Home"
              ? { color: "#fc9501", fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }
              : { color: "#000000", fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }
          }
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{ alignItems: "center" }}
        onPress={() => handleNavigation("MySchedules")}
      >
        {itemSelected === "MySchedules" ? (
          <SchedulesIconSelected />
        ) : (
          <SchedulesIcon />
        )}
        <Text
          style={
            itemSelected === "MySchedules"
              ? { color: "#fc9501", fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }
              : { color: "#000000", fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }
          }
        >
          Meus horários
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{ alignItems: "center" }}
        onPress={() => handleNavigation("Profile")}
      >
        {itemSelected === "Profile" ? <ProfileIconSelected /> : <ProfileIcon />}
        <Text
          style={
            itemSelected === "Profile"
              ? { color: "#fc9501", fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }
              : { color: "#000000", fontFamily: globalStyles.fontFamilyBold, fontSize: globalStyles.fontSizeSmall }
          }
        >
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 30,
    borderWidth: 0.2,
  },
});
