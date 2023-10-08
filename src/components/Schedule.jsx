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
import { AppSettingsContext } from "../context/AppSettings";

import { globalStyles } from "../assets/globalStyles"
import DefaultPicture from "../assets/icons/DefaultPicture.png"
import { CancelSchedule } from "../assets/imgs/CancelSchedule";
import { StopProcessError } from "../assets/imgs/StopProcessError";

import { formatDate } from "../utils/formatDate";
import { getDayOfWeek } from "../utils/getDayFromWeek";
import { getNameLastName } from "../utils/getNameLastName";
import { formatServicePrice } from "../utils/formatServicePrice";
import { getTotalPriceFromServices } from "../utils/getTotalPriceFromServices";

import { DefaultModal } from "./modals/DefaultModal";
import { Contact } from "./modals/Contact";

import { useNavigation } from "@react-navigation/native";

import { getProfessionalInfoByName } from "../services/schedules/getProfessionalInfoByName";
import { cancelSchedule } from "../services/schedules/cancelSchedule";

import { verifyIfUserCanCancelSchedule } from "../validation/verifyIfUserCanCancelSchedule";

export const Schedule = ({ schedule }) => {
    const [professionalPicture, setProfessionalPicture] = useState(null)
    const [cancelScheduleState, setCancelScheduleState] = useState(null)
    const [contactVisible, setContactVisible] = useState(false)

    const { setSomethingWrong } = useContext(SomethingWrongContext)
    const { settings } = useContext(AppSettingsContext)

    const handleCancel = () => {

        const canCancelSchedule = verifyIfUserCanCancelSchedule(4, schedule.day, schedule.schedule, setSomethingWrong);

        if (canCancelSchedule) {

            setCancelScheduleState({
                image: <CancelSchedule />,
                mainMessage: "Realmente deseja cancelar seu agendamento?",
                message: "Lembre-se de que esta ação é IRREVERSIVEL. O agendamento será cancelado imediatamente.",
                firstButtonText: "Sim, cancelar",
                firstButtonAction: () => {
                    cancelSchedule(schedule.clientUid, schedule, setSomethingWrong)
                    setCancelScheduleState(null),
                    setSomethingWrong
                },
                secondButtonText: "Não",
                secondButtonAction: () => setCancelScheduleState(null),
            })
        }
        else {
            setCancelScheduleState({
                image: <StopProcessError />,
                mainMessage: "Ação não permitida!",
                message: "Você não pode mais cancelar seu horário pois está muito em cima da hora. Caso precise você pode entrar em contato conosco.",
                firstButtonText: "Contato",
                firstButtonAction: () => {
                    setContactVisible(true)
                },
                secondButtonText: "Cancelar",
                secondButtonAction: () => setCancelScheduleState(null),
            })

        }
    }

    const date = schedule && formatDate(schedule.day, setSomethingWrong)
    const weekDay = schedule && getDayOfWeek(schedule.day, setSomethingWrong)
    const scheduleHour = schedule && schedule.schedule

    const services = schedule && schedule.services.map(service => service.name)

    const navigation = useNavigation()

    useEffect(() => {
        getProfessionalInfoByName(schedule.professional, setProfessionalPicture, setSomethingWrong)

    }, [])

    const totalPriceServicesSelected = schedule.services && formatServicePrice(getTotalPriceFromServices(schedule.services, setSomethingWrong))

    return (
        <View style={styles.container}>
            <DefaultModal
                modalContent={cancelScheduleState}
            />
            <Contact
                modalContact={contactVisible}
                setModalVisible={setContactVisible}
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

                <View style={{ justifyContent: 'space-around', width: "60%" }}>
                    <Text style={styles.barbershopName}>{getNameLastName(schedule.professional, setSomethingWrong, false)}</Text>
                    <Text style={[styles.text, { color: "#00000090" }]}>{settings?.address}</Text>
                    <Text style={[styles.text, { color: "#00000090", marginTop: -10 }]}>{settings?.neighborhood}</Text>
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
                        <Text style={styles.totalPrice}>{totalPriceServicesSelected}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.contentButtons}>
                <TouchableOpacity style={[styles.button]} activeOpacity={.8} onPress={handleCancel}>
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
        width: "100%"
    },

    img: {
        width: 120,
        maxWidth: "40%",
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
        fontFamily: globalStyles.fontFamilyMedium,
        width: "100%",
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
    },

    totalPrice: {
        fontSize: globalStyles.fontSizeVerySmall,
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        marginTop: 5
    }
})
