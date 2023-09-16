/**
 * Renders a default modal component with the given modal content.
 *
 * @param {Object} modalContent - The content of the modal.
 * @param {Object} modalContent.image - The image to be displayed in the modal.
 * @param {string} modalContent.mainMessage - The main message to be displayed in the modal.
 * @param {string} modalContent.message - The additional message to be displayed in the modal.
 * @param {string} modalContent.firstButtonText - The text for the first button in the modal.
 * @param {Object} modalContent.firstButtonStyles - The additional styles for the first button in the modal.
 * @param {Object} modalContent.firstButtonTextStyles - The additional styles for the text of the first button in the modal.
 * @param {Function} modalContent.firstButtonAction - The action to be performed when the first button is pressed.
 * @param {string} modalContent.secondButtonText - The text for the second button in the modal.
 * @param {Object} modalContent.secondButtonStyles - The additional styles for the second button in the modal.
 * @param {Object} modalContent.secondButtonTextStyles - The additional styles for the text of the second button in the modal.
 * @param {Function} modalContent.secondButtonAction - The action to be performed when the second button is pressed.
 */

import { Modal, View, StyleSheet, Text } from "react-native"

import { globalStyles } from "../../assets/globalStyles"

import { Button } from "../Button"

export const DefaultModal = ({ modalContent }) => {
    if (!modalContent) return

    return (
        <Modal
            visible={!!modalContent}
            transparent={true}
            animationType={"fade"}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    {modalContent.image}

                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Text style={styles.mainMessage}>{modalContent.mainMessage && modalContent.mainMessage}</Text>
                        <Text style={styles.message}>{modalContent.message && modalContent.message}</Text>
                    </View>

                    <View style={{ width: "100%", alignItems: "center", ...modalContent?.contentButtonsStyles }}>
                        <Button
                            text={modalContent.firstButtonText && modalContent.firstButtonText}
                            addStyles={modalContent.firstButtonStyles && modalContent.firstButtonStyles}
                            addStylesText={modalContent.firstButtonTextStyles && modalContent.firstButtonTextStyles}
                            action={modalContent.firstButtonAction && modalContent.firstButtonAction}
                        />

                        {
                            modalContent.secondButtonText && (
                                <Button
                                    text={modalContent.secondButtonText && modalContent.secondButtonText}
                                    addStyles={modalContent.secondButtonStyles ?
                                        { ...modalContent.secondButtonStyles, marginTop: 10, backgroundColor: globalStyles.champagneColor, color: globalStyles.orangeColor } :
                                        { marginTop: 10, backgroundColor: globalStyles.champagneColor, color: globalStyles.orangeColor }}
                                    addStylesText={modalContent.secondButtonTextStyles ? modalContent.secondButtonTextStyles : { color: globalStyles.orangeColor }}
                                    action={modalContent.secondButtonAction && modalContent.secondButtonAction}
                                />
                            )
                        }
                    </View>
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
    },

    mainMessage: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: 'center',
    },

    message: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        marginVertical: 20,
        fontFamily: globalStyles.fontFamilyBold,
        maxWidth: "90%",
        textAlign: 'center',
    },
})
