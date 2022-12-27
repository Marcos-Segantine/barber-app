import { Text, View, StyleSheet, Pressable } from "react-native"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"

export const Schedules = () => {
    return(
        <View style={style.container}>
            <Header />

            <Text style={style.title}>Selecione um horário</Text>
        
            <View style={style.schedules}>
                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>
            </View>

            <Pressable style={style.comfirmButton}>
                <Text style={style.textConfirm}>Comfirmar</Text>
            </Pressable>

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

    schedules: {
        width: "90%",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 50,
    },

    schedule: {
        borderWidth: 3,
        borderColor: "#E95401",
        borderRadius: 20,
        width: "48%",
        paddingHorizontal: 60,
        paddingVertical: 9,
        marginVertical: 5,
        marginHorizontal: 3,
    },

    textSchedule: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 16,
    },

    comfirmButton: {
        marginTop: 40,
        width: "65%",
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: "#E95401",
        paddingHorizontal: 56,
        paddingVertical: 13,
        alignItems: "center"
    },

    textConfirm: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 14,
    },

    title: {
        fontSize: 34,
        fontWeight: '900',
        color: "#FFFFFF"
    },
})