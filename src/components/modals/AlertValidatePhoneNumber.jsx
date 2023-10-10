import { Modal, View, Text, StyleSheet } from "react-native"

import { Button } from "../Button"

import { AlertPhoneNumberValidation } from "../../assets/imgs/AlertPhoneNumberValidation"
import { globalStyles } from "../../assets/globalStyles"

import { useNavigation } from "@react-navigation/native"

export const AlertValidatePhoneNumber = ({ visible, setVisible }) => {
    const navigation = useNavigation()

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.container}>
                <AlertPhoneNumberValidation />

                <>
                    <Text style={styles.title}>ATENÇÃO</Text>
                    <Text style={styles.text}>Seu número de telefone ainda não foi validado. Por questões de segurança, esta ação é obrigatória.</Text>
                </>

                <Button
                    text={"Continuar"}
                    action={() => navigation.navigate("GetCode")}
                />
                <Button
                    text={"Agora não"}
                    addStyles={{ marginTop: 10, backgroundColor: globalStyles.champagneColor }}
                    addStylesText={{ color: globalStyles.orangeColor }}
                    action={() => setVisible(!visible)}
                />
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
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: "center"
    },

    text: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyRegular,
        textAlign: "center",
        width: "90%",
        marginBottom: 50,
        marginTop: 10
    },
})