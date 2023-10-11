import { useContext, useEffect, useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { DefaultModal } from "../components/modals/DefaultModal"
import { Contact } from "../components/modals/Contact"

import { globalStyles } from "../assets/globalStyles"
import { GetCodePhoneValidation } from "../assets/imgs/GetCodePhoneValidation"
import { StopProcessError } from "../assets/imgs/StopProcessError"

import { UserContext } from "../context/UserContext"

import { handleError } from "../handlers/handleError"

import auth from '@react-native-firebase/auth';
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { userPhoneNumberValidated } from "../services/auth/userPhoneNumberValidated"

export const GetCode = ({ navigation }) => {
    const [confirm, setConfirm] = useState(null)
    const [code, setCode] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [modalContent, setModalContent] = useState(null)
    const [isToShowContactModal, setIsToShowContactModal] = useState(false)

    const { userData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    useEffect(() => {

        (async () => {
            try {

                const phone = userData.phone.replace(/[^0-9]/g, '')

                const confirmation = await auth().verifyPhoneNumber("+55" + phone).catch(({ code, message }) => {
                    if (code === "auth/too-many-requests") {
                        setIsLoading(false)

                        setModalContent({
                            image: <StopProcessError />,
                            mainMessage: "Erro de Validação",
                            message: "Observamos várias tentativas de verificação do seu número. Por razões de segurança, temporariamente bloquearemos o acesso.",
                            firstButtonText: "Página Inicial",
                            firstButtonAction: () => {
                                setModalContent(null)
                                navigation.navigate("Home")
                            },
                            secondButtonText: "Contato",
                            secondButtonAction: () => {
                                setIsLoading(false)
                                setIsToShowContactModal(true)
                            }
                        })
                    }

                    else {
                        setSomethingWrong(true)
                        handleError("GetCode - verifyPhoneNumber", message)
                    }

                })

                if (!confirmation) return

                setConfirm(confirmation);
                setIsLoading(false)

            } catch ({ message }) {
                setSomethingWrong(true)
                handleError("GetCode", message)

            }

        })();

    }, [])

    const confirmCode = async () => {
        try {

            const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
            await auth().currentUser.linkWithCredential(credential);

            userPhoneNumberValidated(userData.uid)
            navigation.navigate("Home")

        } catch ({ code, message }) {
            if (code == 'auth/invalid-verification-code') {
                setIsLoading(false)

                setModalContent({
                    image: <StopProcessError />,
                    mainMessage: "Código Incorreto",
                    message: "O código inserido está incorreto. Por favor, revise com cuidado o código que enviamos a você e tente novamente.",
                    firstButtonText: "Tentar Novamente",
                    firstButtonAction: () => {
                        setModalContent(null)
                    },
                })

            }
            else if (message === "[auth/unknown] User has already been linked to the given provider.") {

                setIsLoading(false)
                userPhoneNumberValidated(userData.uid)

                setModalContent({
                    image: <StopProcessError />,
                    mainMessage: "Houve um Engano",
                    message: "Parece que você já fez a validação do seu número de telefone, desculpe o incoveniente.",
                    firstButtonText: "Página Inicial",
                    firstButtonAction: () => {
                        setModalContent(null)
                        navigation.navigate("Home")
                    },
                })
            }
            else {
                setIsLoading(false)

                setModalContent({
                    image: <StopProcessError />,
                    mainMessage: "Erro de Validação",
                    message: "Ocorreu um erro ao validar o seu número de telefone, por favor tente novamente mais tarde. Caso queira pode entrar em contato conosco",
                    firstButtonText: "Página Inicial",
                    firstButtonAction: () => {
                        setModalContent(null)
                        navigation.navigate("Home")
                    },
                    secondButtonText: "Contato",
                    secondButtonAction: setIsToShowContactModal(true)
                })

                handleError("GetCode", message)
            }
        }
    }

    const contactAction = () => {
        setIsToShowContactModal(false)
        navigation.navigate("Home")
    }

    const phoneHidden = userData?.phone.replace(/[^0-9]/g, '').split('').map((number, index) => index < 8 ? "*" : number).join('')

    if (isLoading) return <Loading flexSize={1} />

    return (
        <View style={[globalStyles.container, { flex: 1 }]}>
            <ComeBack text={"Código de Verificação"} />

            <GetCodePhoneValidation width={"100%"} height={"60%"} />
            <DefaultModal modalContent={modalContent} />
            <Contact
                modalContact={isToShowContactModal}
                setModalVisible={setIsToShowContactModal}
                action={contactAction}
            />

            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={styles.description}>Enviamos um código para o número {phoneHidden}.</Text>
                <Text style={styles.description}>Ensira-o no campo abaixo</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Código"}
                    placeholderTextColor={"#00000050"}
                    keyboardType="numeric"
                    onChangeText={text => setCode(text)}
                />

                <View style={styles.contentHelpers}>
                    <TouchableOpacity>
                        <Text style={styles.helpersText}>Trocar de número</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.helpersText}>Não recebi o código</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    text={"Confirmar"}
                    addStyles={{ marginTop: 30 }}
                    action={() => confirmCode()}
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
