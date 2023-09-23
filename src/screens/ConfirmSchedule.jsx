import { ScrollView, View, Text, StyleSheet } from "react-native"
import { useContext, useEffect, useState } from "react"

import { useIsFocused } from "@react-navigation/native"

import { ComeBack } from "../components/ComeBack"
import { Button } from "../components/Button"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

import { ScheduleContext } from "../context/ScheduleContext"
import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"
import { AppSettingsContext } from "../context/AppSettings"

import { globalStyles } from "../assets/globalStyles"

import { formatDate } from "../utils/formatDate"
import { formatPhoneNumber } from "../utils/formatPhoneNumber"
import { formatServicePrice } from "../utils/formatServicePrice"
import { getTotalPriceFromServices } from "../utils/getTotalPriceFromServices"

import { handleConfirmNewSchedule } from "../handlers/handleConfirmNewSchedule"
import { handleEditExistingSchedule } from "../handlers/handleEditExistingSchedule"

export const ConfirmSchedule = ({ route, navigation }) => {
    const [modalContent, setModalContent] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { schedule, setSchedule } = useContext(ScheduleContext)
    const { userData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)
    const { settings } = useContext(AppSettingsContext)

    const { scheduleToUpdate, isToUpdateSchedule } = route.params

    const dateFormatted = schedule && formatDate(schedule.day, setSomethingWrong)
    const phoneFormatted = schedule && formatPhoneNumber(userData.phone, setSomethingWrong)

    const isFocused = useIsFocused();

    useEffect(() => {
        try {
            schedule.scheduleUid = `${userData.uid}-${schedule.day}-${schedule.professionalUid}-${schedule.schedule}`;

        } catch (error) {
            console.log(error);
            setSomethingWrong(true)
        }

    }, [isFocused]);

    const handleConfirm = async () => {
        const allData = {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            clientUid: userData.uid,
            profilePicture: userData.profilePicture,
            scheduleUid: schedule.scheduleUid,
            services: schedule.services,
            professional: schedule.professional,
            professionalUid: schedule.professionalUid,
            day: schedule.day,
            schedule: schedule.schedule,
        }

        setIsLoading(true)

        if (isToUpdateSchedule) handleEditExistingSchedule(
            scheduleToUpdate,
            allData,
            setSchedule,
            setModalContent,
            setSomethingWrong,
            setIsLoading,
            navigation
        )
        else handleConfirmNewSchedule(
            allData,
            setSchedule,
            userData.uid,
            setModalContent,
            setSomethingWrong,
            setIsLoading,
            navigation
        )
    }

    const totalPriceServicesSelected = schedule.services && formatServicePrice(getTotalPriceFromServices(schedule.services))

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <DefaultModal
                modalContent={modalContent}
            />

            <ComeBack text={"Confirme as informações"} />

            <View style={{ width: "100%", alignItems: 'center' }}>
                <View style={styles.content}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Salão</Text>
                        <Text style={styles.info}>{settings?.companyName}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Endereço</Text>
                        <Text style={styles.info}>{settings?.address + " " + settings?.neighborhood}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Nome</Text>
                        <Text style={styles.info}>{userData.name}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Celular</Text>
                        <Text style={styles.info}>{phoneFormatted}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Data</Text>
                        <Text style={styles.info}>{dateFormatted}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Horário</Text>
                        <Text style={styles.info}>{schedule.schedule}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={styles.describe}>Profissional</Text>
                        <Text style={styles.info}>{schedule.professional}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    {
                        !!schedule.services && schedule.services.map((service, index) => {
                            const servicePrice = formatServicePrice(service.price)
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }} key={index}>
                                    <Text style={styles.describe}>{service.name}</Text>
                                    <Text style={styles.info}>{servicePrice}</Text>
                                </View>
                            )
                        })
                    }

                    <View style={styles.fieldTotal}>
                        <Text style={styles.describe}>Total</Text>
                        <Text style={styles.info}>{totalPriceServicesSelected}</Text>
                    </View>
                </View>
            </View>

            <Text style={{ color: "#00000080", fontSize: globalStyles.fontSizeVerySmall, textAlign: "center" }}>
                Lembre-se que depois de confirmado o horario você não podera desmarcar o serviço com menos de {settings?.minimalHoursToCancelSchedule} horas de antecência.
            </Text>

            <Button text={"Confirmar Horário"} action={handleConfirm} addStyles={{ marginTop: "5%" }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: "100%",
        padding: 15,
        marginVertical: 10,
    },

    describe: {
        color: "#00000070",
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
    },

    info: {
        fontSize: globalStyles.fontSizeSmall,
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        maxWidth: "75%",
    },

    fieldTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderTopWidth: .8,
        borderTopColor: "#000000",
        paddingTop: 10,
    },
})
