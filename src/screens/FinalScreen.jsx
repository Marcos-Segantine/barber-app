import { Text, View, StyleSheet, Pressable } from "react-native"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"

import ComfirmationSvg from '../assets/ComfirmationSvg'

export const FinalScreen = ({ navigation }) => {

    return(
        <View style={style.container}>
            <Header />

            <ComfirmationSvg />

            <Pressable style={style.goBackButton} onPress={() => navigation.navigate("InitialScreen")}>
                <Text style={style.textGoBack}>Voltar ao inicio</Text>
            </Pressable>

            <Footer />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
        alignItems: "center"
    },

    goBackButton: {
        width: '60%',
        borderColor: "#E95401",
        borderWidth: 3,
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 15,
    },

    textGoBack: {
        color: "#E95401",
        fontWeight: '700',
    }
})