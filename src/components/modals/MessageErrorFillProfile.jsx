import { Modal, StyleSheet, Text, View } from "react-native";

import { StopProcessError } from "../../assets/imgs/StopProcessError";
import { globalStyles } from "../../assets/globalStyles";

import { Button } from "../Button";

export const MessageErrorFillProfile = ({ error, setError }) => {
    if(!error) return

    return (
        <Modal
            visible={!!error}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.content}>

                    <StopProcessError width={"100%"} height={"55%"} />

                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Text style={styles.mainMessage}>{error.mainMessage}</Text>
                        <Text style={styles.message}>{error.message}</Text>
                    </View>

                    <Button
                        text={"Tentar Novamente"}
                        action={() => setError(null)}
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
        justifyContent: "space-around",
        width: "80%",
        height: "70%",
        paddingBottom: "5%"
    }
})