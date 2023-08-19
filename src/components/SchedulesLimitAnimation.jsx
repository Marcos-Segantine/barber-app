/**
 * Displays a Lottie animation when the user has reached the schedules limit.
 * 
 * @param {number} flexSize - The flex size of the View component. Default is 0.2.
 * @param {number} width - The width of the Lottie animation. Default is 200.
 * @param {number} height - The height of the Lottie animation. Default is 200.
 * @returns {JSX.Element} - The rendered component.
 */

import { View } from "react-native";

import LottieView from "lottie-react-native";

export const SchedulesLimitAnimation = ({ flexSize = .2, width = 200, height = 200 }) => {
    return (
        <View style={{ flex: flexSize, justifyContent: "center", alignItems: "center" }}>
            <LottieView
                source={require("../assets/animations/schedulesLimit.json")}
                loop
                autoPlay
                style={{ width, height, }}
            />
        </View>
    )
}
