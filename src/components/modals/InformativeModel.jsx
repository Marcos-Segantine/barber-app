/**
 * Displays a modal with informative content.
 * 
 * @param {string} mainMessage - The main message displayed in the modal.
 * @param {ReactNode} content - The additional content to be displayed in the modal(a component).
 * @param {string} firstButtonText - The text for the first button in the modal.
 * @param {function} firstButtonAction - The action to be performed when the first button is pressed.
 */

import { Modal, View, Text, StyleSheet } from "react-native"

import { Button } from "../Button"

import { globalStyles } from "../../assets/globalStyles"

export const InformativeModel = ({ modalContent }) => {
    if (!modalContent) return

    return (
        <Modal
            visible={!!modalContent}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.mainMessage}>{modalContent.mainMessage}</Text>

                    {modalContent.content}

                    <Button
                        text={modalContent.firstButtonText}
                        action={modalContent.firstButtonAction}
                        addStyles={{ marginTop: 30 }}
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

    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        alignItems: 'center',
        width: "90%",
        justifyContent: "space-around",
        paddingBottom: 20,
        paddingHorizontal: 5,
        paddingVertical: 15,
    },

    mainMessage: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
        marginBottom: 20,
    },
})