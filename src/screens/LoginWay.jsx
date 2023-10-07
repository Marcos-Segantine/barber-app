import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { LoginImage } from "../assets/imgs/LoginImage";

import { LoginWithMedia } from "../components/LoginWithMedia";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

import { globalStyles } from "../assets/globalStyles";
import { useState } from "react";


export const LoginWay = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)


  if (isLoading) return <Loading flexSize={1} />

  return (
    <ScrollView
      contentContainerStyle={globalStyles.container}
      overScrollMode="never"
      bounces={false}>
      <LoginImage height={300} />

      <LoginWithMedia isToShowJustIcon={false} setIsLoading={setIsLoading} />

      <View style={styles.lineOr}>
        <Text style={styles.line}></Text>

        <Text style={styles.textOr}>ou</Text>

        <Text style={styles.line}></Text>
      </View>

      <Button
        text={"Entrar com email e senha"}
        action={() => navigation.navigate("Login")}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.linkToLogin}>
          Não tem uma conta? <Text style={styles.createText}>Criar conta</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  lineOr: {
    marginVertical: 35,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  line: {
    borderTopWidth: 0.3,
    height: 0,
    width: "42%",
  },

  textOr: {
    color: "#00000080",
    fontSize: globalStyles.fontSizeSmall,
    marginBottom: 6,
    fontFamily: globalStyles.fontFamilyBold,
  },

  linkToCreateAcconut: {
    fontSize: globalStyles.fontSizeSmall,
    marginTop: 30,
    color: "#00000050",
  },

  linkToLogin: {
    fontFamily: globalStyles.fontFamilyMedium,
    fontSize: globalStyles.fontSizeSmall,
    marginTop: 30,
    color: "#00000050",
  },

  createText: {
    color: globalStyles.orangeColor,
    fontFamily: globalStyles.fontFamilyBold,
  },
});
