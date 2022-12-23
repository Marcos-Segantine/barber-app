import { Text, Pressable, View } from "react-native";

export const Login = ({ navigation }: any) => {
    return(
        <View>
            <Pressable onPress={() => navigation.navigate("InitialScreen")}>
                <Text>GO TO INITIAL SCREEN</Text>
            </Pressable>
        </View>
    )
}