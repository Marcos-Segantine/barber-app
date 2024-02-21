/**
 * Button component.
 * 
 * @param {string} text - The text to display on the button.
 * @param {function} action - The function to execute when the button is pressed.
 * @param {object} addStyles - Additional styles to apply to the button.
 * @param {object} addStylesText - Additional styles to apply to the button text.
 * @param {boolean} isToBlockButton - Determines if the button should be disabled.
 * @returns {JSX.Element} - The rendered button component.
 */

import { Text, TouchableOpacity, StyleSheet } from "react-native"

import { globalStyles } from "../assets/globalStyles"

type ButtonProps = {
  text: string,
  action: () => void,
  addStyles?: object,
  addStylesText?: object,
  isToBlockButton?: boolean
}

export const Button = ({ text, action, addStyles, addStylesText, isToBlockButton }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={isToBlockButton ? [styles.button, { ...addStyles, backgroundColor: globalStyles.orangeColorDarker }] : [styles.button, { ...addStyles }]}
      activeOpacity={.8}
      onPress={action}
      disabled={isToBlockButton}
    >
      <Text style={[styles.text, { ...addStylesText }]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "85%",
    backgroundColor: globalStyles.orangeColor,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    fontFamily: globalStyles.fontFamilyMedium
  },

  text: {
    color: "#FFFFFF",
    fontFamily: globalStyles.fontFamilyBold,
    fontSize: globalStyles.fontSizeSmall,
  }
})
