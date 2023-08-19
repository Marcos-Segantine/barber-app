/**
 * Renders a link profile component.
 *
 * @param {string} text - The text to display.
 * @param {ReactNode} icon - The icon to display.
 * @param {function} action - The action to perform when pressed.
 * @returns {ReactNode} The link profile component.
 */

import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

import { globalStyles } from "../assets/globalStyles";
import { ArrowRight } from "../assets/icons/ArrowRight";

export const LinkProfile = ({ text, icon, action }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
      <View style={{ flexDirection: "row" }}>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </View>

      <ArrowRight />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginVertical: 3,
    paddingHorizontal: 15,
  },

  text: {
    marginLeft: 10,
    fontSize: globalStyles.fontSizeSmall,
    fontFamily: globalStyles.fontFamilyBold,
    color: "#000000",
  },
});
