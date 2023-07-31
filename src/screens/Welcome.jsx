import {
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { useEffect } from "react";

import { globalStyles } from "../assets/globalStyles";

import { verifyIfUserHasLogged } from "../validation/verifyIfUserHasLogged";

export const Welcome = ({ navigation }) => {
  useEffect(() => {
    verifyIfUserHasLogged(navigation);

  }, []);

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
        <Text style={styles.companyName}>WD3 Barbearia</Text>
        <Text style={styles.desc}>The best app for barbers in Nova Ponte</Text>
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
  },
});
