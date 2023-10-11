/**
 * Component that displays a loading animation.
 *
 * @param {number} flexSize - The flex size of the component.
 * @param {number} width - The width of the loading animation.
 * @param {number} height - The height of the loading animation.
 * @returns {JSX.Element} - The loading component.
 */

import { StyleSheet, Text, View } from "react-native";

import LottieView from "lottie-react-native";
import { globalStyles } from "../assets/globalStyles";

export const Loading = ({ flexSize = .2, width = 200, height = 200, text = null }) => {
    return (
        <View style={{ flex: flexSize, justifyContent: "center", alignItems: "center" }}>
            <LottieView
                source={require("../assets/animations/loading.json")}
                loop
                autoPlay
                style={{ width, height, }}
            />
            {
                text &&
                <Text style={styles.text}>{text}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#00000070",
        width: "80%",
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: "center",
        width: "100%"
    }
})