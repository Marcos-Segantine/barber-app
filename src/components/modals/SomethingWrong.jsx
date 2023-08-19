/**
 * Renders a modal displaying an error message.
 * 
 * @param {boolean} somethingWrongVisible - Flag indicating if the modal should be visible
 * @returns {JSX.Element} - The rendered modal component
 */

import { Modal, StyleSheet, View, Text } from "react-native"

import { globalStyles } from "../../assets/globalStyles"
import { SomethingWrongImage } from "../../assets/imgs/SomethingWrongImage"

import { Button } from "../Button"

export const SomethingWrong = ({ somethingWrongVisible }) => {
    return (
        <Modal
            visible={somethingWrongVisible && false}
            transparent={true}
            animationType={"fade"}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <SomethingWrongImage />

                    <Text style={styles.mainMessage}>Algo deu errado!</Text>
                    <Text style={styles.message}>Sentimos muito mas ocorreu um erro, por favor tente novamente mais tarde. Caso queira pode entrar em contato conosco</Text>

                    <Button
                        text={"Home"}
                        addStyles={{ marginBottom: 10 }}
                    />
                    <Button
                        text={"Nossos Contatos"}
                        addStyles={{ backgroundColor: "#fff8ef" }}
                        addStylesText={{ color: globalStyles.orangeColor }}
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
        fontFamily: globalStyles.fontFamilyBold
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