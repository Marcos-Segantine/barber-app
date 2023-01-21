import {ActivityIndicator, View} from 'react-native'

export const LoadingScreen = () => {
    // The size prop with a number is just to android, in IOS will bi "large"
    return(
        <View style={{ marginTop: "20%" }}>
            <ActivityIndicator size={100} color="#E95401" />
        </View>
    )
}
