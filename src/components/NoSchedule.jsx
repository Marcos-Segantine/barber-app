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
