/**
 * Displays a modal to confirm a change in information.
 * 
 * @param {boolean} modalConfirmationNewInfo - Flag indicating if the modal is visible.
 * @param {function} setModalConfirmationNewInfo - Function to update the modal visibility.
 * @param {function} handleNewInformation - Function to handle the new information.
 * @returns {JSX.Element} - The modal component.
 */

import { Modal, StyleSheet, View, Text } from "react-native"

import { Button } from "../Button"

import { globalStyles } from "../../assets/globalStyles"
import { ConfirmationChangeInfoImage } from "../../assets/imgs/ConfirmationChangeInfoImage"
import { useEffect, useState } from "react"

export const WarningChangeInformation = ({
    modalConfirmationNewInfo,
    setModalConfirmationNewInfo,
    handleNewInformation
}) => {
    const [time, setTime] = useState(15)

    useEffect(() => {
        if (modalConfirmationNewInfo) {

            const interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);

            if (time == 0) {
                clearInterval(interval);
            }

            return () => {
                clearInterval(interval);
            }
        };
    }, [modalConfirmationNewInfo, time]);

    return (
        <Modal
            visible={modalConfirmationNewInfo}
            transparent={true}
            animationType={"fade"}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <ConfirmationChangeInfoImage />

                    <Text style={styles.mainMessage}>ATENÇÃO !!</Text>
                    <Text style={styles.message}>Ao atualizar seu email e/ou número de telefone, insira dados válidos para evitar a perda da sua conta. Lembre-se de realizar uma nova verificação do seu email.</Text>

                    <Button
                        text={time === 0 ? "Entendi" : `Entendi (${time})`}
                        addStyles={time === 0 ? { marginBottom: 10 } : { marginBottom: 10, backgroundColor: globalStyles.orangeColorDarker }}
                        action={() => { handleNewInformation(), setTime(15) }}
                        isToBlockButton={time !== 0}
                    />
                    <Button
                        text={"Cancelar"}
                        addStyles={{ backgroundColor: "#fff8ef" }}
                        addStylesText={{ color: globalStyles.orangeColor }}
                        action={() => { setModalConfirmationNewInfo(false), setTime(15) }}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00000090',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainMessage: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
    },

    message: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        marginVertical: 15,
        fontFamily: globalStyles.fontFamilyBold,
        maxWidth: "80%",
        textAlign: 'center',
    },

    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        alignItems: 'center',
        width: "80%",
        height: "70%"
    }
})
