import { Text, View, StyleSheet, Pressable } from "react-native"

import { Header } from "../../../shared/Header"
import { Footer } from "../../../shared/Footer"
import { Title } from "../../../components/Title"
import { Button } from "../../../components/Button"
import { useContext, useEffect, useState } from "react"
import { ShedulesUserContext } from "../../../context/ShedulesUser"

import firestore from '@react-native-firebase/firestore';

export const Schedules = ({ navigation }) => {
    const [ avaibleTimesState, setAvaibleTimesState ] = useState()
    
    const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)

    const sheduleMouth = shedulesUser.day?.split('').slice(5, 7).join('');
    const sheduleDay = shedulesUser.day?.split("").slice(8).join("");
    const sheduleHour = shedulesUser.shedule;
    const sheduleProfessional = shedulesUser.professional
    
    useEffect(() => {
        console.log("USE EFECT");
        firestore()
        .collection("working_hours")
        .get()
        .then(({ _docs }) => {
            const currentDay = _docs[0]._data.times
            const workingTimes = currentDay

                firestore()
                    .collection("unavailable_times")
                    .doc(`${sheduleMouth}_2023`)
                    .get()
                    .then(({ _data }) => {
                        // If month does't exists
                        if(_data === undefined) {
                            setAvaibleTimesState(workingTimes)
                            return
                        }

                        const thereAreProfessionalRegisterInDay = _data[sheduleDay] ? _data[sheduleDay][sheduleProfessional] : null
                    
                        let avaibleTimesState__Temp
                        thereAreProfessionalRegisterInDay ?
                            (
                                avaibleTimesState__Temp = workingTimes.filter(time => {
                                    return !_data[sheduleDay][sheduleProfessional].includes(time)
                                }),
                                setAvaibleTimesState(avaibleTimesState__Temp)
                            ) :
                            (
                                setAvaibleTimesState(workingTimes)
                            )

                    })
                })
    }, [])

    const handleButton = () => {
        shedulesUser.shedule ?
            navigation.navigate("ConfirmSchedule") :
            console.log("TIME NOT SELECTED");
    } 

    return(
        <View style={style.container}>
            <Header />

            <Title title="Selecione um horário" />
        
            <View style={style.schedules}>
                {
                    avaibleTimesState ? 
                    (
                        avaibleTimesState.map((time, index) => {
                            return(
                                <Pressable key={index} style={style.schedule} onPress={() => setShedulesUser({...shedulesUser, shedule: `${time}`})}>
                                    <Text style={style.textSchedule}>{time}</Text>
                                </Pressable>
                            )
                        })
                    )
                    :
                    null
                }
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