import { Text, View, StyleSheet, Pressable } from "react-native";

import { Title } from "../../../components/Title";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../../context/UserContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import firestore from '@react-native-firebase/firestore';

export const YourSchedules = () => {
    const [ schedules, setShedules ] = useState()
    
    const { userData } = useContext(UserContext)

    const navigation = useNavigation()

    const isFocused = useIsFocused()

    useEffect(() => {

        console.log("FOCUDED", "USER -> ", userData);

        firestore()
            .collection("schedules_by_user")
            .doc(userData.uid)
            .get()
            .then(({ _data }) => {
                setShedules(_data.schedules)
            })

    }, [ isFocused ])


    return(
        <View style={style.container}>
            <Title title={"Seus agendamentos"} />

            <View style={style.content}>
                {
                    schedules ?

                    schedules.map((item, index) => {
                        return(
                            <Pressable style={style.schedulesDay} key={index} onPress={() => navigation.navigate("ScheduleDetail", {item})}>
                                <Text style={style.text}>Dia: {item.day.split('-').reverse().join('/ ')}</Text>
                                <Text style={style.text}>Horario: {item.shedule}</Text>
                            </Pressable>            
                        )
                    }) :
                    <Text style={style.text}>Sem Horarios marcados</Text>
                }
            </View>
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