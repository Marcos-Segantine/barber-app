import { useContext, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native"

import { ComeBack } from "../components/ComeBack"
import { Button } from "../components/Button"
import { LoginWithMedia } from "../components/LoginWithMedia"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

import { EmailIcon } from "../assets/icons/Email"
import { PadlockIcon } from "../assets/icons/PadlockIcon"
import { globalStyles } from "../assets/globalStyles"
import passwordVisionIcon from "../assets/icons/passwordVisionIcon.png"
import passwordVisionBlockIcon from "../assets/icons/passwordVisionBlockIcon.png"

import { verifyEmailAndPasswordToRegister } from "../validation/verifyEmailAndPasswordToRegister"

import { trim } from "../utils/trim"

import { SomethingWrongContext } from "../context/SomethingWrongContext"

export const Register = ({ navigation }) => {
    const [emailNewUser, setEmailNewUser] = useState("")
    const [passwordNewUser, setPasswordNewUser] = useState("")
    const [inputSelected, setInputSelected] = useState("")

    const [hiddenPassword, setHiddenPassword] = useState(true)

    const [isLoading, setIsLoading] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const handleFocusInput = (field) => setInputSelected(field)

    const handleContinue = async () => {
        const isEmailPasswordValid = await verifyEmailAndPasswordToRegister(
            trim(emailNewUser, setSomethingWrong),
            passwordNewUser,
            navigation,
            setModalContent,
            setIsLoading,
            setSomethingWrong
        )

        if (isEmailPasswordValid) navigation.navigate("FillProfile", { isToCreateUser: true, emailNewUser: trim(emailNewUser), passwordNewUser, })
    }

    const styleEmail = inputSelected === 'email' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input
    const stylePassword = inputSelected === 'password' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <ComeBack />
            <DefaultModal
                modalContent={modalContent}
            />

            <Text style={styles.title}>
                Crie sua Conta
            </Text>

            <View style={styles.contentInput}>
                <View style={styleEmail}>
                    <EmailIcon />

                    <TextInput
                        style={{ color: "#000000", width: "100%" }}
                        placeholder={"Email"}
                        value={emailNewUser}
                        placeholderTextColor={"#00000050"}
                        onFocus={() => handleFocusInput("email")}
                        onChangeText={text => setEmailNewUser(text)}
                        keyboardType="email-address"
                    />
                </View>

                <View style={stylePassword}>
                    <PadlockIcon />

                    <TextInput
                        style={{ color: "#000000", width: "100%" }}
                        placeholder={"Senha"}
                        value={passwordNewUser}
                        placeholderTextColor={"#00000050"}
                        secureTextEntry={hiddenPassword}
                        onFocus={() => handleFocusInput("password")}
                        onChangeText={text => setPasswordNewUser(text)}

                    />
                    <Pressable style={styles.iconPasswordVisibility} onPress={() => setHiddenPassword(!hiddenPassword)}>
                        <Image source={hiddenPassword ? passwordVisionBlockIcon : passwordVisionIcon} style={{ width: 25, height: 25 }} />
                    </Pressable>
                </View>
            </View>

            <Button text={"Continuar"} action={handleContinue} />

            <View style={styles.lineOr}>
                <Text style={styles.line}></Text>
                <Text style={styles.textOr}>
                    ou continue com
                </Text>
                <Text style={styles.line}></Text>
            </View>

            <LoginWithMedia isToShowJustIcon={true} setIsLoading={setIsLoading} />

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkToLogin}>
                    Ja possui uma conta? <Text style={{ color: globalStyles.orangeColor }}>Fazer Login</Text>
                </Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: globalStyles.fontSizeVeryLarger,
        color: "#000000",
        fontFamily: globalStyles.fontFamilyBold,
        marginTop: 40,
    },

    contentInput: {
        marginTop: "10%",
        marginBottom: "10%",
        width: "100%",
        alignItems: 'center',
    },

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

    inputFocused: {
        backgroundColor: "#fff8ec"
    },

    lineOr: {
        marginVertical: 35,
        width: "80%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    line: {
        borderTopWidth: .3,
        height: 0,
        width: "23%"
    },

    textOr: {
        color: '#00000080',
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
    },

    linkToLogin: {
        fontSize: globalStyles.fontSizeSmall,
        marginTop: 30,
        color: "#00000050"
    },

    iconPasswordVisibility: {
        position: 'absolute',
        right: 5,
        height: "100%",
        paddingHorizontal: 5,
        justifyContent: "center",
    }
})
