import { Text, View, StyleSheet } from "react-native"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"
import { Title } from "../components/Title"

export const Professionals = () => {
    return(
            <View style={style.container}>
                <Header />
                
                <Title title="Selecione um Profissional" />

                <View style={style.contantProfessionals}>
                    <View style={style.professionals}>
                    </View>

                    <View style={style.professionals}>
                    </View>

                    <View style={style.professionals}>
                    </View>
                </View>

                <Footer />
            </View>
        )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
        alignItems: "center",
    },

    contantProfessionals: {
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingHorizontal: 20,
    },

    professionals: {
        width: 150,
        height: 150,
        margin: 10,
        borderColor: '#E95401',
        borderWidth: 2,
    }
})