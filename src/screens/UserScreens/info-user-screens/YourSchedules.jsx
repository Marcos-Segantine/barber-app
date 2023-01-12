import { Text, View, StyleSheet, Pressable } from "react-native";

import { Header } from "../../../shared/Header";
import { Footer } from "../../../shared/Footer";

import { Title } from "../../../components/Title";
import { useContext } from "react";

import { UserContext } from "../../../context/UserContext";

export const YourSchedules = () => {
    const { userData } = useContext(UserContext)

    return(
        <View style={style.container}>
            <Header />

            <Title title={"Seus agendamentos"} />

            <View style={style.content}>
                {
                    userData?.shedules ?

                    userData.shedules.map((item, index) => {
                        return(
                            <Pressable style={style.schedulesDay} key={index}>
                                <Text style={style.text}>Dia: {item.day}</Text>
                                <Text style={style.text}>Horario: {item.shedule}</Text>
                                <Text style={style.text}>Serviço: {item.service}</Text>
                            </Pressable>            
                        )
                    }) :
                    <Text style={style.text}>Sem Horarios marcados</Text>
                }
            </View>

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

    content: {
        width: "100%",
        alignItems: "center",
        marginTop: 70,
    },

    schedulesDay: {
        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#E95401",
        width: "80%",
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 20
    },

    text: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 17
    }
})