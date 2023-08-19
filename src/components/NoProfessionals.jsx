/**
 * Renders a view with a Lottie animation when there are no professionals available.
 *
 * @param {number} flexSize - The size of the flex for the view.
 * @param {number} width - The width of the Lottie animation.
 * @param {number} height - The height of the Lottie animation.
 * @returns {JSX.Element} The rendered component.
 */

import { View } from "react-native";

import LottieView from "lottie-react-native";

export const NoProfessionals = ({ flexSize = .2, width = 200, height = 200 }) => {
    return (
        <View style={{ flex: flexSize, justifyContent: "center", alignItems: "center" }}>
            <LottieView
                source={require("../assets/animations/noProfessionals.json")}
                loop
                autoPlay
                style={{ width, height, }}
            />
        </View>
    )
}