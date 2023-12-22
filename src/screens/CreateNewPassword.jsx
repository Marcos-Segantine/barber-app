import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useContext, useState } from "react"

import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { ComeBack } from "../components/ComeBack"
import { Button } from "../components/Button"
import { DefaultModal } from "../components/modals/DefaultModal"

import { CreateNewPasswordImage } from "../assets/imgs/CreateNewPasswordImage"
import { PadlockIcon } from "../assets/icons/PadlockIcon"
import passwordVisionIcon from "../assets/icons/passwordVisionIcon.png"
import passwordVisionBlockIcon from "../assets/icons/passwordVisionBlockIcon.png"
import { globalStyles } from "../assets/globalStyles"

import { handleContinueCreateNewPassword } from "../handlers/handleContinueCreateNewPassword"

export const CreateNewPassword = ({ navigation, route }) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [inputSelected, setInputSelected] = useState("")

    const { userData, setUserData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const { newAccountByMedia, mediaEmail } = route.params ? route.params : {}

    const [processMessage, setProcessMessage] = useState(null)
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true)

    const handleFocusInput = (field) => setInputSelected(field)

    const stylePassword = inputSelected === 'password' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input
    const styleConfirmPassword = inputSelected === 'confirmPassword' ? [styles.input, { backgroundColor: '#fff8ec', borderColor: '#fc9501', borderWidth: 1 }] : styles.input

    return (
        <ScrollView
            contentContainerStyle={globalStyles.container}
            overScrollMode="never"
            bounces={false}
        >
            <ComeBack text={"Crie uma nova senha"} />

            <DefaultModal
                modalContent={processMessage}
            />

            <CreateNewPasswordImage
                width={350}
                height={350}
            />

            <Text style={styles.text}>
                Crie sua nova senha
            </Text>

            <View style={styles.contentInput}>
                <View style={stylePassword}>
                    <PadlockIcon />

                    <TextInput
                        style={{ color: "#000000", width: "100%", height: 50 }}
                        placeholder={"Senha"}
                        value={password}
                        placeholderTextColor={"#00000050"}
                        secureTextEntry={hiddenPassword}
                        onFocus={() => handleFocusInput("password")}
                        onChangeText={text => setPassword(text)}

                    />
                    <Pressable
                        style={styles.iconPasswordVisibility}
                        onPress={() => setHiddenPassword(!hiddenPassword)}
                    >
                        <Image
                            source={hiddenPassword ? passwordVisionBlockIcon : passwordVisionIcon}
                            style={{ width: 25, height: 25 }}
                        />
                    </Pressable>
                </View>

                <View style={styleConfirmPassword}>
                    <PadlockIcon />

                    <TextInput
                        style={{ color: "#000000", width: "100%", height: 50 }}
                        placeholder={"Senha"}
                        value={confirmPassword}
                        placeholderTextColor={"#00000050"}
                        secureTextEntry={hiddenConfirmPassword}
                        onFocus={() => handleFocusInput("confirmPassword")}
                        onChangeText={text => setConfirmPassword(text)}

                    />
                    <Pressable
                        style={styles.iconPasswordVisibility}
                        onPress={() => setHiddenConfirmPassword(!hiddenConfirmPassword)}
                    >
                        <Image
                            source={hiddenConfirmPassword ? passwordVisionBlockIcon : passwordVisionIcon}
                            style={{ width: 25, height: 25 }}
                        />
                    </Pressable>
                </View>
            </View>

            <Button
                text={"Continue"}
                action={() => handleContinueCreateNewPassword(
                    password,
                    confirmPassword,
                    setProcessMessage,
                    newAccountByMedia,
                    setUserData,
                    userData,
                    mediaEmail,
                    navigation,
                    setSomethingWrong
                )}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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

    iconPasswordVisibility: {
        position: 'absolute',
        right: 5,
        height: "100%",
        paddingHorizontal: 5,
        justifyContent: "center",
    },

    text: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        width: "85%",
        marginTop: 20,
        fontFamily: globalStyles.fontFamilyMedium
    },
})