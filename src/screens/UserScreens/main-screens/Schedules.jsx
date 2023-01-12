import { Text, View, StyleSheet, Pressable } from "react-native"

import { Header } from "../../../shared/Header"
import { Footer } from "../../../shared/Footer"
import { Title } from "../../../components/Title"
import { Button } from "../../../components/Button"
import { useContext } from "react"
import { ShedulesUserContext } from "../../../context/ShedulesUser"

export const Schedules = ({ navigation }) => {

    const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)

    const handleButton = () => {
        shedulesUser.shedule ? 
        navigation.navigate("ConfirmSchedule") :
        console.log("NAO SELECIONOU HORARIO");
    }

    return(
        <View style={style.container}>
            <Header />

            <Title title="Selecione um horário" />
        
            <View style={style.schedules}>
                <Pressable style={style.schedule} onPress={() => setShedulesUser({...shedulesUser, shedule: "09:00"})}>
                    <Text style={style.textSchedule}>09:00</Text>
                </Pressable>

                <Pressable style={style.schedule} onPress={() => setShedulesUser({...shedulesUser, shedule: "10:00"})}>
                    <Text style={style.textSchedule}>10:00</Text>
                </Pressable>

                <Pressable style={style.schedule} onPress={() => setShedulesUser({...shedulesUser, shedule: "11:00"})}>
                    <Text style={style.textSchedule}>11:00</Text>
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

            <Button text="Comfirmar" action={handleButton} />
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
})