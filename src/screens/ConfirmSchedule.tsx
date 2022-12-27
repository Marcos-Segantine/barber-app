import { Text, View, StyleSheet, Pressable } from "react-native"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"

export const ComfirmSchedule = () => {
    return(
        <View style={style.container}>
            <Header />

            <Text style={style.title}>O seu agendamento:</Text>
            <Text style={style.subTitle}>Confira todos os dados</Text>

            <View style={style.contentData}>
                <View style={style.data}>
                    <Text style={style.textData}>Data: 09/09/22</Text>
                </View>

                <View style={style.data}>
                    <Text style={style.textData}>Data: 09/09/22</Text>
                </View>

                <View style={style.data}>
                    <Text style={style.textData}>Data: 09/09/22</Text>
                </View>

                <View style={style.data}>
                    <Text style={style.textData}>Data: 09/09/22</Text>
                </View>

                <View style={style.data}>
                    <Text style={style.textData}>Data: 09/09/22</Text>
                </View> 
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
        alignItems: "center",
        backgroundColor: "#1E1E1E",
    },

    title: {
        fontSize: 34,
        fontWeight: '900',
        color: "#FFFFFF"
    },

    subTitle: {
        fontSize: 12,
        color: "#FFFFFF60"
    },

    contentData: {
        width: "85%",
        marginTop: 30
    },

    data: {
        borderColor: '#E95401',
        borderRadius: 20,
        borderWidth: 2,
        paddingVertical: 15,
        alignItems: "center",
        marginVertical: 5,
    },

    textData: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 16,
    },

    comfirmButton: {
        marginTop: 30,
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
})