import {  View, StyleSheet } from "react-native"

import { useContext, useEffect, useState } from "react"

import { Calendar } from "react-native-calendars"

import { Header } from "../../../shared/Header"
import { Footer } from "../../../shared/Footer"
import { Title } from "../../../components/Title"
import { Button } from '../../../components/Button'
import { ShedulesUserContext } from "../../../context/ShedulesUser"

import firestore from '@react-native-firebase/firestore';

export const Calandar = ({ navigation }) => {
    const currentDate = new Date()

    const [ deniedDays, setDeniedDays ] = useState()
    const [ month, setMonth ] = useState(currentDate.getMonth() + 1)
    const [ arrawLeftAvaible, setArrawLeftAvaible ] = useState(false)

    // const currentMonth = currentDate.getMonth() + 1

    const { shedulesUser, setShedulesUser } = useContext(ShedulesUserContext)

    useEffect(() => {
        firestore()
            .collection("denied_days")
            .get()
            .then(async({ _docs }) => {
                setDeniedDays(_docs[month - 1]._data)
            })
        }, [month])

        const handleButton = () => {
        shedulesUser.day ?
            navigation.navigate("Schedules") :
            console.log("NÃO SELECIONOU UM DIA");
    }

    const handleLeftArrow = () => {
        if (month === 1) {
            setMonth(12)
            return
        }
        
        setMonth(month - 1)
    }

    const handleRightArrow = () => {
        if (month === 12) {
            setMonth(1)
            return
        } 

        setMonth(month + 1)
    }

    return(
        <View style={style.container}>
            <Header />

            <Title title="Selecione um data" />

            <Calendar
                  onPressArrowLeft={subtractMonth => {
                    handleLeftArrow()
                    subtractMonth()
                  }}
                  onPressArrowRight={addMonth => {
                    handleRightArrow()  
                    addMonth()
                  }}
                minDate={String(new Date())}
                markedDates={deniedDays}
                onDayPress={day => setShedulesUser({...shedulesUser, day: day.dateString})}
                disableArrowLeft={arrawLeftAvaible}
                style={{
                    width: 350,
                    marginTop: 40,
                    padding: 5,
                    borderRadius: 20,
                }}
                theme={{
                    calendarBackground: "#E95401",
                    dayTextColor: "#FFFFFF",
                    selectedDayTextColor: "#E95401",
                    selectedDayBackgroundColor: "#FFFFFF",
                    textDisabledColor: '#FFFFFF40',
                    textSectionTitleColor: "#FFFFFF",
                    arrowColor: "#FFFFFF",
                    monthTextColor: "#FFFFFF",
                    textDayHeaderFontWeight: "700"
                }}
            />

            <Button text="Comfirmar" action={handleButton} />
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
})