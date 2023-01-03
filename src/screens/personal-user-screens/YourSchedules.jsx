import { Text, View, StyleSheet, Pressable } from "react-native";

import { Header } from "../../shared/Header";
import { Footer } from "../../shared/Footer";

import { Title } from "../../components/Title";

export const YourSchedules = () => {
    return(
        <View style={style.container}>
            <Header />

            <Title title={"Seus agendamentos"} />


            <View style={style.content}>
                <Pressable style={style.schedulesDay}>
                    <Text style={style.text}>Dia 09/08</Text>
                </Pressable>
                <Pressable style={style.schedulesDay}>
                    <Text style={style.text}>Dia 09/08</Text>
                </Pressable>
                <Pressable style={style.schedulesDay}>
                    <Text style={style.text}>Dia 09/08</Text>
                </Pressable>
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