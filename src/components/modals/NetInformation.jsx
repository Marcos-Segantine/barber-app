/**
 * Component to display a modal when there is no internet connection.
 * It listens for network state changes and renders a modal with a message.
 */

import { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import NetInfo from "@react-native-community/netinfo";

import { NoInternetImage } from "../../assets/imgs/NoInternetImage";
import { globalStyles } from "../../assets/globalStyles";

import { AppSettingsContext } from "../../context/AppSettings";
import { SomethingWrongContext } from "../../context/SomethingWrongContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { formatDate } from "../../utils/formatDate";
import { getDayOfWeek } from "../../utils/getDayFromWeek";

export const NetInformation = () => {
    const [isConnected, setIsConnected] = useState(null);
    const [lastSchedule, setLastSchedule] = useState(null)

    const { settings } = useContext(AppSettingsContext)
    const { setSomeThingWrong } = useContext(SomethingWrongContext)

    // Subscribe to network state changes
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {

        (async () => {

            setLastSchedule(JSON.parse(await AsyncStorage.getItem("@barber_app__lastSchedule")))

        })();

    }, [])

    // Render the modal if there is no internet connection
    return (isConnected !== null && !isConnected) && (
        <Modal
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <NoInternetImage width={"100%"} height={"40%"} />

                <Text style={styles.title}>Sem conexão com a internet</Text>

                {
                    lastSchedule &&

                    <>
                        <Text style={styles.subTitle}>Seu próximo agendamento</Text>
                        <Text style={styles.alert}>Pode ser que esta informação esteja desatualizada!</Text>

                        <View style={{ flexDirection: "row", width: "80%", flexWrap: "wrap" }}>
                            <Text style={styles.description}>Profissional: </Text>
                            <Text style={styles.value}>{lastSchedule.professional}</Text>
                        </View>

                        <View style={{ flexDirection: "row", width: "80%" }}>
                            <Text style={styles.description}>Dia: </Text>
                            <Text style={styles.value}>{formatDate(lastSchedule.day, setSomeThingWrong)} - {getDayOfWeek(lastSchedule.day, setSomeThingWrong)}</Text>
                        </View>

                        <View style={{ flexDirection: "row", width: "80%" }}>
                            <Text style={styles.description}>Horário: </Text>
                            <Text style={styles.value}>{lastSchedule.schedule}</Text>
                        </View>

                        <View style={{ flexDirection: "row", width: "80%", flexWrap: "wrap" }}>
                            {
                                lastSchedule?.services &&
                                (
                                    lastSchedule.services?.length === 1 ?
                                        <>
                                            <Text style={styles.description}>Serviço: </Text>
                                            <Text style={styles.value}>Corte</Text>
                                        </> :
                                        <>
                                            <Text style={[styles.description, { width: "100%", marginBottom: 5 }]}>Serviços: </Text>
                                            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "10%" }}>
                                                <View style={{ backgroundColor: "#000000", borderRadius: 200, width: 10, height: 10 }}></View>
                                                <Text style={styles.value}>Corte</Text>
                                            </View>
                                        </>
                                )
                            }
                        </View>

                        <Text style={[styles.value, { color: "#00000090", position: "absolute", bottom: 20, width: "100%", textAlign: "center" }]}>{settings.address} - {settings.neighborhood}</Text>
                    </>
                }


            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
    },

    title: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeLarger,
        textAlign: "center",
        fontFamily: globalStyles.fontFamilyBold
    },

    subTitle: {
        color: "#000000",
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyMedium,
        marginTop: "8%",
    },

    alert: {
        color: "#00000090",
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyLight,
        marginBottom: 15
    },

    description: {
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
    },

    value: {
        color: "#000000",
        fontFamily: globalStyles.fontFamilyRegular,
        fontSize: globalStyles.fontSizeSmall,
        marginLeft: 5
    }
})