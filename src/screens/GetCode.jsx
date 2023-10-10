import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"

import { globalStyles } from "../assets/globalStyles"
import { GetCodePhoneValidation } from "../assets/imgs/GetCodePhoneValidation"

export const GetCode = ({ navigation }) => {
    return (
        <View style={[globalStyles.container, { flex: 1 }]}>
            <ComeBack text={"Código de Verificação"} />

            <GetCodePhoneValidation width={"100%"} height={"60%"} />

            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={styles.description}>Enviamos um código para o número ********723.</Text>
                <Text style={styles.description}>Ensira-o no campo abaixo</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Código"}
                    placeholderTextColor={"#00000050"}
                    keyboardType="numeric"
                />

                <View style={styles.contentHelpers}>
                    <TouchableOpacity>
                        <Text style={styles.helpersText}>Número errado</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.helpersText}>Não recebi o código</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    text={"Confirmar"}
                    addStyles={{ marginTop: 30 }}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        backgroundColor: "#fafafa",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "transparent",
        marginTop: 20,
        paddingHorizontal: 20,
        color: "#000000",
        flexDirection: 'row',
        alignItems: 'center',
    },

    contentHelpers: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 5
    },

    helpersText: {
        color: globalStyles.orangeColor,
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyBold,
    },

    description: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyRegular,
        color: "#000000",
        width: "100%"
    }
})