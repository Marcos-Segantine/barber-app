/**
 * Component that displays a loading animation.
 *
 * @param {number} flexSize - The flex size of the component.
 * @param {number} width - The width of the loading animation.
 * @param {number} height - The height of the loading animation.
 * @returns {JSX.Element} - The loading component.
 */

import { View } from "react-native";

import LottieView from "lottie-react-native";

export const Loading = ({ flexSize = .2, width = 200, height = 200 }) => {
    return (
        <View style={{ flex: flexSize, justifyContent: "center", alignItems: "center" }}>
            <LottieView
                source={require("../assets/animations/loading.json")}
                loop
                autoPlay
                style={{ width, height, }}
            />
        </View>
    )
}
