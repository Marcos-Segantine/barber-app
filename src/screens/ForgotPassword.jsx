import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import { useContext, useEffect, useState } from "react"

import { ComeBack } from "../components/ComeBack"
import { Button } from "../components/Button"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

import { EmailForgotPasswordIcon } from "../assets/icons/EmailForgotPasswordIcon"
import { ForgotPasswordImage } from "../assets/imgs/ForgotPasswordImage"
import { SMSIcon } from "../assets/icons/SMSIcon"
import { globalStyles } from "../assets/globalStyles"

import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { handleContinueForgotPassword } from "../handlers/handleContinueForgotPassword"

export const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [modalInfo, setModalInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { setSomethingWrong } = useContext(SomethingWrongContext)

    if (isLoading) return <Loading flexSize={1} />

    return (
        <SafeAreaView style={globalStyles.container}>
            <DefaultModal
                modalContent={modalInfo}
            />

            <ComeBack text={"Esqueci minha senha"} />

            <Text style={{ color: "#000000", fontSize: globalStyles.fontSizeSmall, marginTop: 30, fontFamily: globalStyles.fontFamilyMedium }}>Por favor preencha um dos campos para que possamos identificar-lo</Text>

            <View style={styles.contentContact}>
                <View
                    style={styles.contact}
                    activeOpacity={.7}
                >
                    <View style={styles.contentIcon}>
                        <EmailForgotPasswordIcon />
                    </View>
                    <View style={{ marginLeft: 10, width: "70%", }}>
                        <Text style={styles.serviceContact}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={"Insira seu email"}
                            placeholderTextColor={"#00000050"}
                            onChangeText={text => setEmail(text.trim())}
                            keyboardType={"email-address"}
                        />
                    </View>
                </View>

                <View style={styles.lineOr}>
                    <View style={styles.line}></View>

                    <Text style={styles.textOr}>
                        ou
                    </Text>

                    <View style={styles.line}></View>
                </View>

                <View
                    style={styles.contact}
                    activeOpacity={.7}
                >
                    <View style={styles.contentIcon}>
                        <SMSIcon />
                    </View>
                    <TouchableOpacity style={{ marginLeft: 10, width: "70%", }}>
                        <Text style={styles.serviceContact}>Número de Celular</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={"Insira seu número"}
                            placeholderTextColor={"#00000050"}
                            onChangeText={text => setPhone(text.trim())}
                            keyboardType={"number-pad"}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Button
                text={"Confirmar"}
                action={() => handleContinueForgotPassword(
                    setIsLoading,
                    email,
                    phone,
                    setModalInfo,
                    setSomethingWrong,
                    navigation,
                )}
                addStyles={{ marginTop: 30, marginBottom: 20 }}
            />

            <ForgotPasswordImage />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContact: {
        marginTop: 30,
        alignItems: 'center',
        width: "100%",
    },

    contact: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: 'transparent',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    contentIcon: {
        width: 80,
        backgroundColor: '#fff8ec',
        borderRadius: 100,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    serviceContact: {
        color: '#00000070',
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
    },

    contactData: {
        color: '#000000',
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
    },

    input: {
        color: "#000000",
        width: "100%",
        backgroundColor: "#FFFFFF80",
        borderRadius: 15,
        paddingLeft: 15,
    },

    lineOr: {
        width: "80%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    line: {
        borderTopWidth: .3,
        height: 0,
        width: "40%"
    },

    textOr: {
        color: '#00000080',
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
    },
})
