import {  View, StyleSheet } from "react-native"

import { useState } from "react"

import { Calendar } from "react-native-calendars"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"
import { Title } from "../components/Title"
import { Button } from '../components/Button'

export const Calandar = () => {
    const [ selectedDay, setSelectedDay ] = useState({})

    return(
        <View style={style.container}>
            <Header />

            <Title title="Selecione um data" />

            <Calendar
                minDate={String(new Date())}
                onDayPress={day => setSelectedDay(day.dateString)}
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

            <Button text="Comfirmar" />
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