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
