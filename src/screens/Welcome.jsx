import {
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { useContext, useEffect, useState } from "react";

import { globalStyles } from "../assets/globalStyles";

import { verifyIfUserHasLogged } from "../validation/verifyIfUserHasLogged";

import { CannotUseApp } from "../components/CannotUseApp";

import { AppSettingsContext } from "../context/AppSettings";

export const Welcome = ({ navigation }) => {
  const [blockAccess, setBlockAccess] = useState(false);

  const { settings } = useContext(AppSettingsContext)

  useEffect(() => {
    ((async () => {

      const response = await fetch('https://southamerica-east1-barber-ddb8a.cloudfunctions.net/canUseApp');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.response) {
        verifyIfUserHasLogged(navigation);
      }
      else {
        setBlockAccess(true)
      }

    }))();

  }, []);

  if (blockAccess) return <CannotUseApp />

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Image
        style={styles.img}
        source={require("../assets/imgs/welcome.jpg")}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo à</Text>
        <Text style={styles.companyName}>{settings?.companyName}</Text>
        <Text style={styles.desc}>The best app for barbers in {settings?.city}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  img: {
    width: "100%",
    height: "100%",
  },

  content: {
    height: "30%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingLeft: "10%",
  },

  title: {
    fontFamily: globalStyles.fontFamilyBold,
    fontSize: globalStyles.fontSizeLarger,
    color: "#FFFFFF"
  },

  companyName: {
    fontFamily: globalStyles.fontFamilyBold,
    color: globalStyles.orangeColor,
    fontSize: globalStyles.fontSizeLarger,
    marginBottom: 20,
  },

  desc: {
    fontFamily: globalStyles.fontFamilyMedium,
    fontSize: globalStyles.fontSizeSmall,
    color: "#FFFFFF"
  },
});
