/**
 * Renders the login buttons with media icons.
 * 
 * @param {boolean} isToShowJustIcon - Indicates if only the media icons should be shown.
 * @param {function} setIsLoading - The function to set the loading state.
 * @returns {JSX.Element} The rendered component.
 */

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";

import { SomethingWrongContext } from "../context/SomethingWrongContext";

import { AppleIcon } from "../assets/icons/AppleIcon";
import { FacebookIcon } from "../assets/icons/FacebookIcon";
import { GoogleIcon } from "../assets/icons/GoogleIcon";
import { globalStyles } from "../assets/globalStyles";

import { signInWithGoogle } from "../services/auth/signInWithGoogle";

import { useNavigation } from "@react-navigation/native";

export const LoginWithMedia = ({ isToShowJustIcon, setIsLoading }) => {
  const navigation = useNavigation();

  const { setSomethingWrong } = useContext(SomethingWrongContext)

  return (
    <>
      {isToShowJustIcon ? (
        <View style={styles.contentIcons}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonJustIcon}
            onPress={() => signInWithGoogle(navigation, setSomethingWrong, setIsLoading)}
          >
            <GoogleIcon />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.buttonJustIcon,
              styles.buttonDisabled,
              { marginHorizontal: 15 },
            ]}
            disabled={true}
          >
            <FacebookIcon />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonJustIcon, styles.buttonDisabled]}
            disabled={true}
          >
            <AppleIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => signInWithGoogle(navigation, setSomethingWrong, setIsLoading)}
          >
            <GoogleIcon />
            <Text style={styles.text}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonDisabled]}
            disabled={true}
          >
            <FacebookIcon />
            <Text style={styles.text}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonDisabled]}
            disabled={true}
          >
            <AppleIcon />
            <Text style={styles.text}>Apple ID</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    borderColor: "#00000030",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 15,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonJustIcon: {
    borderWidth: 0.5,
    borderColor: "#00000030",
    borderRadius: 10,
    width: "20%",
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    backgroundColor: "#DCDCDC70",
  },

  text: {
    color: "#000000",
    marginLeft: 8,
    fontFamily: globalStyles.fontFamilyMedium,
    fontSize: globalStyles.fontSizeSmall
  },

  contentIcons: {
    flexDirection: "row",
  },
});
