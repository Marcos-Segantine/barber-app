/**
 * Render a component that allows the user to navigate back to the previous screen.
 * @param {string} text - The text to display.
 */

import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useContext } from "react"

import { useNavigation } from "@react-navigation/native"

import { ArrowComeBack } from "../assets/icons/ArrowComeBack"
import { globalStyles } from "../assets/globalStyles"

import { SomethingWrongContext } from "../context/SomethingWrongContext"
import { UserContext } from "../context/UserContext"

import { SomethingWrong } from "./modals/SomethingWrong"

import { getPreviousScreensName } from "../utils/getPreviousScreensName"

import { handleNavigation } from "../handlers/handleNavigation"

export const ComeBack = ({ text }) => {
    const navigation = useNavigation()

    const { somethingWrong, setSomethingWrong } = useContext(SomethingWrongContext)
    const { userData } = useContext(UserContext)

    // Handle the navigation when the user presses the back button.
    const handleComeBack = () => {
        const [previousScreen, lastScreen] = getPreviousScreensName(navigation)

        handleNavigation(
            previousScreen,
            lastScreen,
            navigation,
            userData
        )
    }

    return (
        <View style={styles.container}>
            <SomethingWrong
                somethingWrongVisible={somethingWrong}
                setSomethingWrongVisible={setSomethingWrong}
            />

            <TouchableOpacity onPress={handleComeBack}>
                <ArrowComeBack />
            </TouchableOpacity>

            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        paddingRight: 10,
    },

    text: {
        color: '#000000',
        fontSize: globalStyles.fontSizeLarger,
    }
})
