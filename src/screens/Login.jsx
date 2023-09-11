import { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable } from "react-native"

import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { EmailIcon } from "../assets/icons/Email"
import { PadlockIcon } from "../assets/icons/PadlockIcon"
import { globalStyles } from "../assets/globalStyles"
import passwordVisionIcon from "../assets/icons/passwordVisionIcon.png"
import passwordVisionBlockIcon from "../assets/icons/passwordVisionBlockIcon.png"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { LoginWithMedia } from "../components/LoginWithMedia"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"

import { signInWithEmailAndPassword } from "../services/auth/signInWithEmailAndPassword"

import { trim } from "../utils/trim"

export const Login = ({ navigation, route }) => {
    const { emailNewUser, passwordNewUser } = route.params ? route.params : {}

    const [inputSelected, setInputSelected] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [hiddenPassword, setHiddenPassword] = useState(true)

    const [isLoading, setIsLoading] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    const { setUserData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    useEffect(() => {
        if (emailNewUser, passwordNewUser) {
            setEmail(emailNewUser)
            setPassword(passwordNewUser)

        }

    }, [emailNewUser, passwordNewUser])

    const handleFocusInput = (field) => setInputSelected(field)

    const handleLogin = () => {
        signInWithEmailAndPassword(
            navigation,
            trim(email),
            password,
            setModalContent,
            setUserData,
            setEmail,
            setPassword,
            setSomethingWrong,
            setIsLoading,
        )
    }

    const styleEmail = inputSelected === 'email' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input
    const stylePassword = inputSelected === 'password' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <DefaultModal
                modalContent={modalContent}
            />
            <ComeBack />

            <Text style={styles.title}>
                Login
            </Text>

            <View style={styles.contentInput}>
                <View style={styleEmail}>
                    <EmailIcon />

                    <TextInput
                        style={{ color: "#000000", width: "100%" }}
                        placeholder={"Email"}
                        value={email}
                        placeholderTextColor={"#00000050"}
                        onFocus={() => handleFocusInput("email")}
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>

                <View style={stylePassword}>
                    <PadlockIcon />

                    <TextInput
                        style={{ color: "#000000", width: "100%" }}
                        placeholder={"Senha"}
                        value={password}
                        placeholderTextColor={"#00000050"}
                        secureTextEntry={hiddenPassword}
                        onFocus={() => handleFocusInput("password")}
                        onChangeText={text => setPassword(text)}

                    />
                    <Pressable style={styles.iconPasswordVisibility} onPress={() => setHiddenPassword(!hiddenPassword)}>
                        <Image source={hiddenPassword ? passwordVisionBlockIcon : passwordVisionIcon} style={{ width: 25, height: 25 }} />
                    </Pressable>
                </View>

            </View>

            <Button text={"Login"} action={handleLogin} />

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <View style={styles.lineOr}>
                <View style={styles.line}></View>

                <Text style={styles.textOr}>
                    ou continue com
                </Text>

                <View style={styles.line}></View>
            </View>

            <LoginWithMedia isToShowJustIcon={true} setIsLoading={setIsLoading} />

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkToLogin}>
                    Não tem uma conta? <Text style={{ color: globalStyles.orangeColor }}>Criar conta</Text>
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
        marginLeft: 25,
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

    forgotPasswordText: {
        color: globalStyles.orangeColor,
        fontFamily: globalStyles.fontFamilyBold,
        fontSize: globalStyles.fontSizeSmall,
        marginTop: 20,
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
        color: "#00000050",
        fontFamily: globalStyles.fontFamilyMedium
    },

    iconPasswordVisibility: {
        position: 'absolute',
        right: 5,
        height: "100%",
        paddingHorizontal: 5,
        justifyContent: "center",
    }
})
