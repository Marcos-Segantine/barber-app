/**
 * Render a schedule component.
 * 
 * @param {Object} schedule - The schedule object.
 * @param {boolean} schedule.confirmCancelScheduleVisible - Flag indicating if the confirm cancel schedule modal is visible.
 * @param {string} schedule.date - The date of the schedule.
 * @param {string} schedule.weekDay - The week day of the schedule.
 * @param {string} schedule.scheduleHour - The hour of the schedule.
 * @param {Array<Object>} schedule.services - The list of services in the schedule.
 * @param {string} schedule.professional - The name of the professional in the schedule.
 * @param {string} schedule.professionalPicture - The picture of the professional in the schedule.
 * @param {Function} schedule.setConfirmCancelSchedule - Function to set the confirm cancel schedule visibility.
 * @param {Function} schedule.setProfessionalPicture - Function to set the professional picture.
 * @returns {JSX.Element} The rendered component.
 */

import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

import { SomethingWrongContext } from "../context/SomethingWrongContext";

import { globalStyles } from "../assets/globalStyles"
import DefaultPicture from "../assets/icons/DefaultPicture.png"

import { formatDate } from "../utils/formatDate";
import { getDayOfWeek } from "../utils/getDayFromWeek";

import { ConfirmCancelSchedule } from "../components/modals/ConfirmCancelSchedule"

import { useNavigation } from "@react-navigation/native";

import { getProfessionalInfoByName } from "../services/schedules/getProfessionalInfoByName";

export const Schedule = ({ schedule }) => {
    const [confirmCancelScheduleVisible, setConfirmCancelSchedule] = useState(false)
    const [professionalPicture, setProfessionalPicture] = useState(null)

    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const date = schedule && formatDate(schedule.day, setSomethingWrong)
    const weekDay = schedule && getDayOfWeek(schedule.day)
    const scheduleHour = schedule && schedule.schedule

    const services = schedule && schedule.services.map(service => service.name)

    const navigation = useNavigation()

    useEffect(() => {
        getProfessionalInfoByName(schedule.professional, setProfessionalPicture)

    }, [])

    return (
        <View style={styles.container}>
            <ConfirmCancelSchedule
                confirmCancelScheduleVisible={confirmCancelScheduleVisible}
                setConfirmCancelSchedule={setConfirmCancelSchedule}
                scheduleInfo={schedule && schedule}
            />
            <View style={{ borderBottomWidth: .2, borderColor: "#00000060" }}>
                <Text style={styles.date}>{`${date} - ás ${scheduleHour}`}</Text>
                <Text style={[styles.date, { color: "#00000090" }]}>{weekDay}</Text>
            </View>

            <View style={styles.contentInfoSchedule}>
                {
                    professionalPicture ?
                        (
                            <Image
                                style={styles.img}
                                source={{ uri: professionalPicture }}
                            />
                        ) :
                        (
                            <Image source={DefaultPicture} style={styles.img} />
                        )
                }

                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.barbershopName}>{schedule.professional}</Text>
                    <Text style={[styles.text, { color: "#00000090" }]}>ENDEREÇO</Text>
                    <View>
                        <Text style={[styles.text, { color: "#00000090", fontFamily: globalStyles.fontFamilyBold }]}>Serviços: </Text>
                        <Text style={[styles.text, { color: globalStyles.orangeColor, fontFamily: globalStyles.fontFamilyBold }]}>
                            {
                                schedule && services.map((service, index) => {
                                    if (index === services.length - 1) return service
                                    return service + ", "
                                })
                            }
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.contentButtons}>
                <TouchableOpacity style={[styles.button]} activeOpacity={.8} onPress={() => setConfirmCancelSchedule(true)}>
                    <Text style={{ color: globalStyles.orangeColor, fontFamily: globalStyles.fontFamilyMedium }}>Cancelar horário</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#fc9501' }]}
                    activeOpacity={.8}
                    onPress={() => navigation.navigate("NewSchedule", { headerText: "Editar Horário", scheduleToUpdate: schedule, isToUpdateSchedule: true })}
                >
                    <Text style={{ color: "#FFFFFF", fontFamily: globalStyles.fontFamilyMedium }}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 10,
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
    },

    date: {
        fontSize: globalStyles.fontSizeSmall,
        color: '#000000',
        fontFamily: globalStyles.fontFamilyBold,
        marginBottom: 10,
    },

    contentInfoSchedule: {
        minHeight: 155,
        flexDirection: 'row',
        borderBottomWidth: .2,
        borderColor: "#00000060",
        paddingVertical: 10,
    },

    img: {
        width: 120,
        height: 120,
        marginRight: 15,
        borderRadius: 150
    },

    barbershopName: {
        color: '#000000',
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
    },

    text: {
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyMedium
    },

    contentButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },

    button: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: globalStyles.orangeColor,
        width: "45%",
        paddingVertical: 5,
        alignItems: 'center',
    }
})
