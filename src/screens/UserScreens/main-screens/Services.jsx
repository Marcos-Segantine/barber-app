import { Text, View, Pressable, StyleSheet, SafeAreaView } from "react-native"

import { Header } from "../../../shared/Header"
import { Footer } from "../../../shared/Footer"
import { Title } from "../../../components/Title"
import { Button } from "../../../components/Button"
import { useContext } from "react"

import { ShedulesUserContext } from "../../../context/ShedulesUser"

import { globalStyles } from "../../globalStyles"

export const Services = ({ navigation }) => {
    const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)

    const handleComfirmButton = () => {
        shedulesUser.service ? 
            navigation.navigate("Professionals") :
            console.log("NAO SELECIONOU UM SERVIÇO");
    };

    return(
        <SafeAreaView style={globalStyles.container}>
            <Header />
            
            <Title title="Selecione o(s) serviços" />

            <View style={style.services}>
                <Pressable style={style.service} onPress={() => setShedulesUser({...shedulesUser, service: "Corte"})}>
                    <Text style={style.serviceText}>Corte</Text>
                    <View style={style.serviceCircle}></View>
                </Pressable>

                <Pressable style={style.service} onPress={() => setShedulesUser({ ...shedulesUser, service: "Barba" })}>
                    <Text style={style.serviceText}>Barba</Text>
                    <View style={style.serviceCircle}></View>
                </Pressable>

                <Pressable style={style.service}>
                    <Text style={style.serviceText} onPress={() => setShedulesUser({ ...shedulesUser, service: "Sobrancelha" })}>sobrancelha</Text>
                    <View style={style.serviceCircle}></View>
                </Pressable>

                <Pressable style={style.service}>
                    <Text style={style.serviceText}  onPress={() => setShedulesUser({ ...shedulesUser, service: "Alisamento" })}>Alisamento</Text>
                    <View style={style.serviceCircle}></View>
                </Pressable>
           
            </View>

            <Button text="Comfirmar" action={handleComfirmButton} waitingData={!!shedulesUser.service} />
            <Footer/>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
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
})