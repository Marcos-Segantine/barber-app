import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useContext, useEffect, useRef, useState } from "react"

import { ComeBack } from "../components/ComeBack"
import { Button } from "../components/Button"
import { ShowProfessionalsDaySchedules } from "../components/ShowProfessionalsDaySchedules"

import { globalStyles } from "../assets/globalStyles"
import { ScheduleContext } from "../context/ScheduleContext"
import { useIsFocused } from "@react-navigation/native"

export const NewSchedule = ({ navigation, route }) => {
    const [preferProfessional, setPreferProfessional] = useState(true)
    const [canScrollToEnd, setCanScrollToEnd] = useState(false)

    const preferProfessionalStyle__Yes = preferProfessional ? [styles.btn, { backgroundColor: globalStyles.orangeColor, borderColor: 'transparent' }] : styles.btn
    const preferProfessionalStyle__No = !preferProfessional ? [styles.btn, { backgroundColor: globalStyles.orangeColor, borderColor: 'transparent' }] : styles.btn

    const { headerText, scheduleToUpdate, isToUpdateSchedule } = route.params

    const { schedule, setSchedule } = useContext(ScheduleContext)

    const allFieldsAreFilled = (schedule.professional && schedule.day && schedule.schedule) ? true : false

    const scrollViewRef = useRef();

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setSchedule({})
        }
    }, [isFocused]);


    const handleConfirm = () => {
        navigation.navigate("OurServices", { scheduleToUpdate, isToUpdateSchedule, })
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={globalStyles.container}
            onContentSizeChange={() => canScrollToEnd && scrollViewRef.current.scrollToEnd({ animated: true })}
        >
            <ComeBack text={headerText} />

            <Text style={styles.text}>Voce tem preferência por profissional?</Text>
            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={preferProfessionalStyle__Yes} activeOpacity={.8} onPress={() => setPreferProfessional(true)}>
                    <Text style={preferProfessional ? { fontFamily: globalStyles.fontFamilyBold, color: '#FFFFFF' } : { fontFamily: globalStyles.fontFamilyBold, color: '#000000' }}>Sim</Text>
                </TouchableOpacity>

                <TouchableOpacity style={preferProfessionalStyle__No} activeOpacity={.8} onPress={() => setPreferProfessional(false)}>
                    <Text style={!preferProfessional ? { fontFamily: globalStyles.fontFamilyBold, color: '#FFFFFF' } : { fontFamily: globalStyles.fontFamilyBold, color: '#000000' }}>Nao</Text>
                </TouchableOpacity>
            </View>

            <ShowProfessionalsDaySchedules
                preferProfessional={preferProfessional}
                setCanScrollToEnd={setCanScrollToEnd}
            />

            {
                allFieldsAreFilled && (
                    <Button
                        text={"Continuar"}
                        action={handleConfirm}
                        addStyles={{ marginTop: 40 }}
                    />
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#00000020",
        width: "35%",
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },

    text: {
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        width: "100%",
        fontSize: globalStyles.fontSizeSmall,
        marginTop: 30,
        marginBottom: 10,
    },
})