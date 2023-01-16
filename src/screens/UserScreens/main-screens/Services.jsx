import { Text, Pressable, StyleSheet, SafeAreaView, ScrollView } from "react-native"

import { Title } from "../../../components/Title"
import { Button } from "../../../components/Button"
import { useContext, useEffect, useState } from "react"

import { ShedulesUserContext } from "../../../context/ShedulesUser"

import { globalStyles } from "../../globalStyles"

import firestore from '@react-native-firebase/firestore';

export const Services = ({ navigation }) => {
    const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)
    const [ serviceUserSelected, setServiceUserSelected ] = useState()
    const [ services, setServices ] = useState(null)

    useEffect(() => {
        firestore()
            .collection("services")
            .doc("services")
            .get()
            .then(({ _data }) => {
                setServices(_data)
            })
    }, [])

    const handleComfirmButton = () => {
        shedulesUser.service ? 
            navigation.navigate("Professionals") :
            console.log("NAO SELECIONOU UM SERVIÇO");
    };

    return(
        <SafeAreaView style={globalStyles.container}>
            <Title title="Selecione o serviço" />

            <ScrollView style={style.services} contentContainerStyle={{alignItems: "center"}}>

                {
                    services ?
                    (
                        services.services.map((service, index) =>  {
                            return(
                                <Pressable style={serviceUserSelected === service ? style.serviceSelected : style.service} key={index}>
                                    <Text style={style.serviceText} onPress={() => {
                                        setShedulesUser({ ...shedulesUser, service: `${service}` })
                                        setServiceUserSelected(service)
                                        
                                    }}>{service}</Text>
                                </Pressable>
                            )
                        })
                    ) :
                    (
                        null
                    )
                }
           
            </ScrollView>

            <Button text="Comfirmar" action={handleComfirmButton} waitingData={!!shedulesUser.service} />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    services: {
        flex: 1,
        width: "100%",
        marginTop: 50,
        maxHeight: 330,
    },

    service: {
        marginVertical: 7,
        width: "80%",
        borderWidth: 3,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        borderColor: "#E95401",
        fontWeight: '700',
        paddingVertical: 5,
        paddingHorizontal: 25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    serviceSelected: {
        backgroundColor: "#E95401",
        marginVertical: 7,
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
        fontSize: 23,
        fontWeight: '700',
    },
})