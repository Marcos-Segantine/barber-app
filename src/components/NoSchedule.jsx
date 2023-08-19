/**
 * Renders a component displaying a "No Schedule" animation.
 * 
 * @param {number} flexSize - The flex size of the component.
 * @param {number} width - The width of the animation.
 * @param {number} height - The height of the animation.
 * @returns {JSX.Element} - The rendered component.
 */

import { View } from "react-native";

import LottieView from "lottie-react-native";

export const NoSchedule = ({ flexSize = .2, width = 200, height = 250 }) => {
    return (
        <View style={{ flex: flexSize, justifyContent: "center", alignItems: "center" }}>
            <LottieView
                source={require("../assets/animations/noSchedule.json")}
                loop
                autoPlay
                style={{ width, height, }}
            />
        </View>
    )
}
