import { Text, View, StyleSheet, Pressable } from "react-native";

import { Header } from "../../../shared/Header";
import { Footer } from "../../../shared/Footer";

import { Title } from "../../../components/Title";

import { CancelSvg } from "../../../assets/CancelSvg";

export const CancelScreen = () => {
    return(
        <View style={style.container}>
            <Header />

            <Title title={"Horario Cancelado!"} />

            <CancelSvg />

            <Pressable style={style.goBackButton} onPress={() => navigation.navigate("InitialScreen")}>
                <Text style={style.textGoBack}>Voltar ao inicio</Text>
            </Pressable>

            <Footer />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#1E1E1E",
        flex: 1,
        alignItems: 'center',
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