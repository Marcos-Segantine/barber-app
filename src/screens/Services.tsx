import { Text, View, Pressable, StyleSheet, SafeAreaView } from "react-native"
import Svg, { Path } from "react-native-svg"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"
import { ScreenStackHeaderRightView } from "react-native-screens"

export const Services = () => {
    return(
        <SafeAreaView style={style.container}>
            <Header />

            <Text style={style.title}>Selecione o(s) serviços</Text>

            <View style={style.services}>
                <Pressable style={style.service}>
                    <Text style={style.serviceText}>Corte</Text>
                    <View style={style.serviceCircle}></View>
                </Pressable>

                <Pressable style={style.service}>
                    <Text style={style.serviceText}>Barba</Text>
                    <View style={style.serviceCircle}></View>
                </Pressable>

                <Pressable style={style.service}>
                    <Text style={style.serviceText}>Sobramcelha</Text>
                    <View style={style.serviceCircle}></View>
                </Pressable>

                <Pressable style={style.service}>
                    <Text style={style.serviceText}>Combo</Text>
                    <View style={style.serviceCircle}></View>
                </Pressable>
           
            </View>

            <Pressable style={style.comfirmButton}>
                <Text style={style.comfirmText}>Comfirmar</Text>
            </Pressable>

            <Footer/>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#1E1E1E",
        flex: 1,
        alignItems: 'center',
    },

    title: {
        fontWeight: '900',
        fontSize: 24,
        color: "#FFFFFF"
    },

    services: {
        width: "100%",
        alignItems: "center",
        marginTop: 50
    },

    service: {
        marginVertical: 15,
        width: "80%",
        borderWidth: 3,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        borderColor: "#E95401",
        fontWeight: '700',
        paddingVertical: 5,
        paddingHorizontal: 25,
        alignItems: "center",
    },

    serviceText: {
        color: "#FFFFFF",
        fontSize: 20,
    },

    serviceCircle: {
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#E95401',
        width: '10%',
        height: 25,
        position: 'absolute',
        right: 15,
        top: 5,
    },

    comfirmButton: {
        backgroundColor: "#E95401",
        borderRadius: 10,
        paddingHorizontal: 56,
        paddingVertical: 13,
        marginTop: 25,
    },

    comfirmText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: '700'
    }
})