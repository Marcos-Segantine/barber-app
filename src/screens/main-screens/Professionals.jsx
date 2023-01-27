import { View, StyleSheet, Pressable, Text } from "react-native"

import { useContext, useState } from "react"

import { ShedulesUserContext } from "../../context/ShedulesUser"

import { Title } from "../../components/Title"
import { Button } from "../../components/Button"

import { globalStyles } from "../globalStyles"

export const Professionals = ({ navigation }) => {
    const [ professionalUserSelected, setProfessionalUserSelected ] = useState()

    const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)

    const handleButton = () => {
        shedulesUser.professional ?
            navigation.navigate("Calandar") :
            console.log("NAO SELECIONOU UM PROFISSIONAL");    
    }   

    return(
            <View style={globalStyles.container}>
                
                <Title title="Selecione um Profissional" />

                <View style={style.contantProfessionals}>
                    <Pressable style={professionalUserSelected === 'Barbeiro 1' ? style.professionalsSelected : style.professionals} onPress={() => {
                        setShedulesUser({...shedulesUser, professional: "Barbeiro 1"})
                        setProfessionalUserSelected("Barbeiro 1")    
                    }}>
                        <Text style={style.professionalName}>Barbeiro 1</Text>
                    </Pressable>

                    <Pressable style={professionalUserSelected === 'Barbeiro 2' ? style.professionalsSelected : style.professionals} onPress={() => {
                        setShedulesUser({...shedulesUser, professional: "Barbeiro 2"})
                        setProfessionalUserSelected("Barbeiro 2")
                    }}>
                        <Text style={style.professionalName}>Barbeiro 2</Text>
                    </Pressable>

                    <Pressable style={professionalUserSelected === 'Barbeiro 3' ? style.professionalsSelected : style.professionals} onPress={() => {
                        setShedulesUser({...shedulesUser, professional: "Barbeiro 3"})
                        setProfessionalUserSelected("Barbeiro 3")
                    }}>
                        <Text style={style.professionalName}>Barbeiro 3</Text>
                    </Pressable>
                </View>

                <Button text="Comfirmar" action={handleButton} waitingData={!!shedulesUser.professional} />

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
    },

    professionalsSelected: {
        width: 150,
        height: 150,
        margin: 10,
        borderColor: '#E95401',
        borderWidth: 5,
    },

    professionalName: {
        color: "#FFFFFF",
        fontWeight: '700',
        position: 'absolute',
        bottom: 10,
        left: 5
    }
})