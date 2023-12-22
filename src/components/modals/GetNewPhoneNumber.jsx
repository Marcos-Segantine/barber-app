import { View, Modal, StyleSheet, Text, TextInput } from "react-native"
import { useState, useContext } from "react"

import { globalStyles } from "../../assets/globalStyles"
import { GetNewPhoneNumberImage } from "../../assets/imgs/GetNewPhoneNumberImage"
import { StopProcessError } from "../../assets/imgs/StopProcessError"

import { Button } from "../Button"
import { DefaultModal } from "./DefaultModal"

import { formatInputPhoneNumber } from "../../utils/formatInputPhoneNumber"

import { isValidPhoneNumber } from "../../validation/isValidPhoneNumber"
import { verifyIfDataAlreadyExist } from "../../validation/verifyIfDataAlreadyExist"

import { UserContext } from "../../context/UserContext"
import { SomethingWrongContext } from "../../context/SomethingWrongContext"
import { updateInformation } from "../../services/user/updateInformation"

export const GetNewPhoneNumber = ({ visible, setVisible, setTimer, setIsLoading }) => {
    const [newPhone, setNewPhone] = useState("")
    const [modalContent, setModalContent] = useState(null)

    const { userData, setUserData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const handleConfirm = () => {
        if (newPhone === userData.phone) {
            setVisible(false)
            setNewPhone("")
            return
        }
        if (newPhone?.trim().length === 0) {
            setModalContent({
                image: <StopProcessError />,
                mainMessage: "Campo Vazio",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setModalContent(null),
                secondButtonText: "Voltar",
                secondButtonAction: () => {
                    setModalContent(null)
                    setVisible(false)
                }
            })

            return
        }

        const isPhoneValid = isValidPhoneNumber(newPhone, setSomethingWrong)
        if (!isPhoneValid) {
            setModalContent({
                image: <StopProcessError />,
                mainMessage: "Número Inválido",
                message: "O número de telefone inserido não é válido. Por favor, verifique o número de telefone que você inseriu. Lembre de colocar o DDD. Exemplo: (99) 99999-9999",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setModalContent(null),
                secondButtonText: "Voltar",
                secondButtonAction: () => {
                    setModalContent(null)
                    setVisible(false)
                }
            })

            return
        }

        const phoneAlreadyExist = verifyIfDataAlreadyExist("phone", newPhone, setSomethingWrong)
        if (!phoneAlreadyExist) {
            setModalContent({
                image: <StopProcessError />,
                mainMessage: "Número Indisponível",
                message: "O número que você digitou já entá em uso, por favor tente um outro número",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setModalContent(null),
                secondButtonText: "Voltar",
                secondButtonAction: () => {
                    setModalContent(null)
                    setVisible(false)
                }
            })


            return
        }

        if (newPhone !== userData.phone) {
            setUserData({ ...userData, phone: newPhone, phoneNumberValidated: false })
            updateUserDataDB({ ...userData, phone: newPhone, phoneNumberValidated: false }, setSomethingWrong)
            setTimer(300)
            setIsLoading(true)
        }

        setNewPhone("")
        setVisible(false)
    }

    const handlePhoneNumber = (phone) => {
        if (phone.length > 15) {
            phone = phone.split("").slice(0, 15).join("")
            setNewPhone(formatInputPhoneNumber(phone))

            return
        }

        setNewPhone(formatInputPhoneNumber(phone))
    }

    return (
        <Modal
            visible={visible}
            animationType={"slide"}
            transparent={true}
        >
            <View style={styles.container}>
                <DefaultModal modalContent={modalContent} />
                <GetNewPhoneNumberImage width={"100%"} height={"55%"} />

                <Text style={styles.text}>Por favor, digite o seu novo número de telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(DD) DDDDD - DDDD"
                    placeholderTextColor={"#00000050"}
                    value={newPhone}
                    onChangeText={text => handlePhoneNumber(text)}
                    keyboardType="numeric"
                />

                <Button
                    text={"Confirmar"}
                    action={handleConfirm}
                    addStyles={{ marginTop: 25 }}
                />
                <Button
                    text={"Cancelar"}
                    action={() => setVisible(null)}
                    addStyles={{ marginTop: 10, backgroundColor: globalStyles.champagneColor }}
                    addStylesText={{ color: globalStyles.orangeColor }}
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

    input: {
        width: "90%",
        height: 50,
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

    text: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        color: "#000000",
    }
})
