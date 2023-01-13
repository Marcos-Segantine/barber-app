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
    const [ monthExists, setMonthExists ] = useState()

    const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)
    const sheduleMouth = shedulesUser.day?.split('').slice(5, 7).join('');

    const handleButton = () => {
        if(!monthExists) {
            const newMonth = `${sheduleMouth}_2023`
            const sheduleDay = shedulesUser.day?.split('').slice(8).join('')
            const professional = shedulesUser.professional

            firestore()
            .collection("working_hours")
            .get()
            .then(() => {
                firestore()
                    .collection("unavailable_times")
                    .doc(newMonth)
                    .set({
                        [sheduleDay]: {
                            [professional]: []
                        }
                    })
                })

        }
        shedulesUser.shedule ? 
        navigation.navigate("ConfirmSchedule") :
        console.log("NAO SELECIONOU HORARIO");
    }

    useEffect(() => {
        firestore()
            .collection("working_hours")
            .get()
            .then(({ _docs }) => {
                const workingTimes = _docs[0]._data

                firestore()
                    .collection("unavailable_times")
                    .doc(`${sheduleMouth}_2023`)
                    .get()
                    .then(res => {
                        const unavaibleTimes = res._data

                        const sheduleDay = shedulesUser.day?.split('').slice(8).join('')
                        const professional = shedulesUser.professional
                        

                        if(unavaibleTimes) {
                            const avaibleTimes = unavaibleTimes[sheduleDay] && unavaibleTimes[sheduleDay][professional] ?
                            (
                                workingTimes.times.filter(time => {
                                    return !unavaibleTimes[sheduleDay][professional].includes(time)
                                })
                            ) :
                            workingTimes.times
                            
                            setAvaibleTimesState(avaibleTimes)
                        }
                        else {
                            setMonthExists(false)
                            setAvaibleTimesState(workingTimes.times)
                        }
                    })
            })
    }, [])

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