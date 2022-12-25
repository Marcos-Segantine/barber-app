import { Text, View, StyleSheet, Pressable } from "react-native"

import { Calendar } from "react-native-calendars"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"

export const Calandar = () => {
    return(
        <View style={style.container}>
            <Header />

            <Text style={style.title}>Selecione um data</Text>

            <Calendar 
                style={{
                    width: 350,
                    marginTop: 40,
                    padding: 5,
                    borderRadius: 20,
                }}
                theme={{
                    calendarBackground: "#E95401",
                    dayTextColor: "#FFFFFF",
                    selectedDayTextColor: "#E95401",
                    selectedDayBackgroundColor: "#FFFFFF",
                    textDisabledColor: '#FFFFFF40',
                    textSectionTitleColor: "#FFFFFF",
                    arrowColor: "#FFFFFF",
                    monthTextColor: "#FFFFFF",
                    textDayHeaderFontWeight: "700"
                }}
            />

            <Pressable style={style.comfirmButton}>
                <Text style={style.textComfirm}>Comfirmar</Text>
            </Pressable>

            <Footer />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1E1E1E",
    },

    title: {
        fontWeight: '900',
        fontSize: 24,
        color: "#FFFFFF"
    },

    comfirmButton: {
        backgroundColor: "#E95401",
        width: "65%",
        alignItems: "center",
        marginTop: 60,
        borderRadius: 10,
        paddingHorizontal: 55,
        paddingVertical: 13,
    },

    textComfirm: {
        color: "#FFFFFF",
        fontWeight: '700'
    }
})