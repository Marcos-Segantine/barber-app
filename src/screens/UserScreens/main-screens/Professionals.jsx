import { View, StyleSheet, Pressable, Text } from "react-native"

import { Header } from "../../../shared/Header"
import { Footer } from "../../../shared/Footer"

import { useContext } from "react"

import { ShedulesUserContext } from "../../../context/ShedulesUser"

import { Title } from "../../../components/Title"
import { Button } from "../../../components/Button"

import { globalStyles } from "../../globalStyles"

export const Professionals = ({ navigation }) => {

    const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)

    const handleButton = () => {
        shedulesUser.professional ?
            navigation.navigate("Calandar") :
            console.log("NAO SELECIONOU UM PROFISSIONAL");    
    }   

    return(
            <View style={globalStyles.container}>
                <Header />
                
                <Title title="Selecione um Profissional" />

                <View style={style.contantProfessionals}>
                    <Pressable style={style.professionals} onPress={() => setShedulesUser({...shedulesUser, professional: "Barbeiro 1"})}>
                        <Text style={{color: "#FFFFFF"}}>BArbeiro 1</Text>
                    </Pressable>

                    <Pressable style={style.professionals} onPress={() => setShedulesUser({...shedulesUser, professional: "Barbeiro 2"})}>
                        <Text style={{color: "#FFFFFF"}}>BArbeiro 2</Text>
                    </Pressable>

                    <Pressable style={style.professionals} onPress={() => setShedulesUser({...shedulesUser, professional: "Barbeiro 3"})}>
                        <Text style={{color: "#FFFFFF"}}>BArbeiro 3</Text>
                    </Pressable>
                </View>

                <Button text="Comfirmar" action={handleButton} waitingData={!!shedulesUser.professional} />

                <Footer />
            </View>
        )
}

const style = StyleSheet.create({
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