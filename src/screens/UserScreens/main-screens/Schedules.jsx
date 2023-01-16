import { Text, View, StyleSheet, Pressable } from "react-native"

import { Title } from "../../../components/Title"
import { Button } from "../../../components/Button"
import { useContext, useEffect, useState } from "react"
import { ShedulesUserContext } from "../../../context/ShedulesUser"

import { globalStyles } from "../../globalStyles"

import firestore from '@react-native-firebase/firestore';

export const Schedules = ({ navigation }) => {
    const [ avaibleTimesState, setAvaibleTimesState ] = useState()
    const [ timeUserSelected, steTimeUserSelected ] = useState()

    const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)

    const sheduleMouth = shedulesUser.day?.split('').slice(5, 7).join('');
    const sheduleDay = shedulesUser.day?.split("").slice(8).join("");
    const sheduleProfessional = shedulesUser.professional
    
    useEffect(() => {
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
        <View style={globalStyles.container}>
            <Title title="Selecione um horário" />
        
            <View style={style.schedules}>
                {
                    avaibleTimesState ? 
                    (
                        avaibleTimesState.map((time, index) => {
                            return(
                                <Pressable key={index} style={timeUserSelected === time ? style.scheduleSeleted : style.schedule} onPress={() => {
                                    setShedulesUser({...shedulesUser, shedule: `${time}`})
                                    steTimeUserSelected(time)
                                }}>
                                    <Text style={style.textSchedule}>{time}</Text>
                                </Pressable>
                            )
                        })
                    )
                    :
                    null
                }
            </View>

            <Button text="Comfirmar" action={handleButton} waitingData={!!shedulesUser.shedule} />
        </View>
    )
}

const style = StyleSheet.create({
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
        paddingVertical: 9,
        marginVertical: 5,
        marginHorizontal: 3,
    },
    
    scheduleSeleted: {
        backgroundColor: "#E95401",
        borderWidth: 3,
        borderColor: "#E95401",
        borderRadius: 20,
        width: "48%",
        paddingVertical: 9,
        marginVertical: 5,
        marginHorizontal: 3,
    },
    
    textSchedule: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 16,
        textAlign: "center",
        fontWeight: '700'
    },
})