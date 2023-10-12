import { useContext, useState } from "react"
import { TextInput, View, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from "react-native"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { WarningChangeInformation } from "../components/modals/WarningChangeInformation"
import { DefaultModal } from "../components/modals/DefaultModal"
import { InformativeModel } from "../components/modals/InformativeModel"
import { Contact } from "../components/modals/Contact"

import { handleNewPicture } from "../handlers/handleNewPicture"
import { handleConfirmNewInformationFillProfile } from "../handlers/handleConfirmNewInformationFillProfile"
import { handleConfirmEmailPhoneChangeFillProfile } from "../handlers/handleConfirmEmailPhoneChangeFillProfile"

import { EditProfilePicture } from "../assets/icons/EditProfilePicture"
import { globalStyles } from "../assets/globalStyles"
import DefaultPicture from "../assets/icons/DefaultPicture.png"

import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import CheckBox from '@react-native-community/checkbox';

import { formatInputPhoneNumber } from "../utils/formatInputPhoneNumber"
import { AppSettingsContext } from "../context/AppSettings"

import { verifyIfUserCanEditInformation } from "../validation/verifyIfUserCanEditInformation"

export const FillProfile = ({ navigation, route }) => {
    const { isToCreateUser, emailNewUser, passwordNewUser } = route.params ? route.params : {}
    const [isToCreateUserState, setIsToCreateUserState] = useState(isToCreateUser || false)

    const [informationNewUser, setInformationNewUser] = useState({
        name: "",
        email: emailNewUser || "",
        phone: "",
        gender: "",
        profilePicture: null,
    })
    const [modalInfo, setModalInfo] = useState(null)
    const [modalInformative, setModalInformative] = useState(null)

    const [contact, setContact] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalConfirmationNewInfo, setModalConfirmationNewInfo] = useState(false)

    const { userData, setUserData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)
    const { settings } = useContext(AppSettingsContext)

    const handlePhoneNumber = (phone) => {
        if (phone.length > 15) {
            phone = phone.split("").slice(0, 15).join("")
            setInformationNewUser({ ...informationNewUser, phone: formatInputPhoneNumber(phone) })

            return
        }

        setInformationNewUser({ ...informationNewUser, phone: formatInputPhoneNumber(phone) })
    }

    const userEditedCounter = +settings.limitEditInformationPerMonth - userData?.informationEditedCount?.counter

    const handleConfirmNewInformation = () => {
        if (!verifyIfUserCanEditInformation(
            userEditedCounter,
            setModalInfo,
            setContact,
            navigation,
            informationNewUser,
            setSomethingWrong
        )) return

        handleConfirmNewInformationFillProfile(
            informationNewUser,
            setModalInfo,
            passwordNewUser,
            navigation,
            setIsLoading,
            setSomethingWrong,
            userData,
            setUserData,
            isToCreateUserState,
            setIsToCreateUserState
        )
    }

    const handleConfirmEmailPhoneChange = () => {
        if (!verifyIfUserCanEditInformation(
            userEditedCounter,
            setModalInfo,
            setContact,
            navigation,
            informationNewUser,
            setSomethingWrong
        )) return

        handleConfirmEmailPhoneChangeFillProfile(
            informationNewUser,
            userData,
            setModalInfo,
            setInformationNewUser,
            setModalConfirmationNewInfo,
            handleConfirmNewInformation,
            setSomethingWrong
        )
    }

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView
            contentContainerStyle={globalStyles.container}
            overScrollMode="never"
            bounces={false}
        >
            <ComeBack text={"Preencha seu perfil"} />

            <WarningChangeInformation
                modalConfirmationNewInfo={modalConfirmationNewInfo}
                setModalConfirmationNewInfo={setModalConfirmationNewInfo}
                handleNewInformation={() => handleConfirmNewInformationFillProfile(
                    informationNewUser,
                    setModalInfo,
                    passwordNewUser,
                    navigation,
                    setIsLoading,
                    setSomethingWrong,
                    userData,
                    setUserData,
                    isToCreateUserState,
                    setIsToCreateUserState,
                )}
            />
            <DefaultModal
                modalContent={modalInfo}
            />
            <Contact modalContact={contact} setModalVisible={setContact} />
            <InformativeModel
                modalContent={modalInformative}
            />

            {
                !isToCreateUserState &&
                <>
                    <Text style={{ color: "#000000", fontFamily: globalStyles.fontFamilyBold, marginVertical: 20, fontSize: globalStyles.fontSizeSmall, width: "100%" }}>
                        AVISO: <Text style={{ fontSize: globalStyles.fontSizeSmall, fontFamily: globalStyles.fontFamilyBold }}>Os campos vazios NÂO serão alterados</Text>
                    </Text>
                </>
            }

            {
                (!isToCreateUserState && userEditedCounter <= 2) &&
                (
                    (userEditedCounter === 0) ?
                        <Text style={styles.alertTop}>Você não pode mais fazer alterar seus dados</Text> :
                        <Text style={styles.alertTop}>{`Você só pode alterar seus dados mais ${userEditedCounter} ${userEditedCounter < 2 ? "vez" : "vezes"}`} </Text>
                )
            }

            <View style={informationNewUser?.profilePicture ? { marginTop: 30, } : { backgroundColor: "#FFFFFF", borderRadius: 150, marginTop: 30 }}>
                {
                    informationNewUser?.profilePicture &&
                    <Image
                        source={{ uri: `data:image/png;base64,${informationNewUser?.profilePicture}` }}
                        style={{ width: 250, height: 250, borderRadius: 150 }}
                    />
                }

                {
                    userData?.profilePicture && !informationNewUser?.profilePicture &&
                    <Image src={userData.profilePicture} style={{ width: 200, height: 200, borderRadius: 150 }} />
                }

                {
                    !userData?.profilePicture && !informationNewUser?.profilePicture &&
                    <Image source={DefaultPicture} />
                }

                <TouchableOpacity
                    style={styles.contentEditPicture}
                    activeOpacity={.8}
                    onPress={() => handleNewPicture(setInformationNewUser, informationNewUser, setModalInfo, setModalInformative, setSomethingWrong)}
                >
                    <EditProfilePicture width={40} height={40} />
                </TouchableOpacity>
            </View>

            <View style={styles.contentInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    placeholderTextColor={"#00000050"}
                    onChangeText={text => setInformationNewUser({ ...informationNewUser, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email - exemplo@exemplo.com"
                    value={emailNewUser ? emailNewUser : informationNewUser.email}
                    placeholderTextColor={"#00000050"}
                    onChangeText={emailNewUser ?
                        null :
                        text => setInformationNewUser({ ...informationNewUser, email: text })
                    }
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Número - (DD) DDDDD - DDDD"
                    placeholderTextColor={"#00000050"}
                    value={informationNewUser.phone}
                    onChangeText={text => handlePhoneNumber(text)}
                    keyboardType="numeric"
                />

                <Text style={{ color: "#000000", fontSize: globalStyles.fontSizeSmall, marginTop: 20, width: "100%", textAlign: "left", fontFamily: globalStyles.fontFamilyBold }}>Gênero</Text>

                <View style={styles.contentGenderOptions}>
                    <View style={styles.contentCheckbox}>
                        <CheckBox
                            tintColors={{ true: globalStyles.orangeColor, false: globalStyles.orangeColor }}
                            disabled={false}
                            value={informationNewUser.gender.toLowerCase() === "masculino"}
                            onValueChange={() => setInformationNewUser({ ...informationNewUser, gender: "masculino", })}
                        />

                        <Text style={styles.text}>Masculino</Text>
                    </View>

                    <View style={[styles.contentCheckbox, { justifyContent: "center" }]}>
                        <CheckBox
                            tintColors={{ true: globalStyles.orangeColor, false: globalStyles.orangeColor }}
                            disabled={false}
                            value={informationNewUser.gender.toLowerCase() === "feminino"}
                            onValueChange={() => setInformationNewUser({ ...informationNewUser, gender: "feminino" })}
                        />

                        <Text style={styles.text}>Feminino</Text>
                    </View>

                    <View style={styles.contentCheckbox}>
                        <CheckBox
                            tintColors={{ true: globalStyles.orangeColor, false: globalStyles.orangeColor }}
                            disabled={false}
                            value={informationNewUser.gender.toLowerCase() === "outros"}
                            onValueChange={() => setInformationNewUser({ ...informationNewUser, gender: "outros" })}
                        />

                        <Text style={styles.text}>Outro</Text>
                    </View>
                </View>

            </View>

            {
                (!isToCreateUserState && userData.informationEditedCount < settings.limitEditInformationPerMonth) &&
                <Text style={styles.alertBottom}>Não recomendamos que você fique alterando sesus dados constantemente</Text>
            }

            <Button
                text={!isToCreateUserState ? "Atualizar" : "Confirmar"}
                action={isToCreateUserState ?
                    handleConfirmNewInformation :
                    handleConfirmEmailPhoneChange
                }
                addStyles={{ marginBottom: 30 }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentInput: {
        marginTop: "10%",
        marginBottom: "10%",
        width: "100%",
        alignItems: 'center'
    },

    input: {
        width: "100%",
        backgroundColor: "#fafafa",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "transparent",
        marginTop: 10,
        paddingHorizontal: 20,
        color: "#000000",
        flexDirection: 'row',
        alignItems: 'center',
    },

    contentEditPicture: {
        backgroundColor: '#fc9501',
        position: 'absolute',
        bottom: 15,
        padding: 3,
        borderRadius: 10,
        right: 15,
        padding: 5,
    },

    contentGenderOptions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginTop: 20
    },

    contentCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "50%",
        marginVertical: 5,
    },

    text: {
        color: "#000000",
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyMedium,
    },

    alertTop: {
        color: "#000000",
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyBold,
        width: "100%",
    },

    alertBottom: {
        color: "#00000060",
        fontSize: globalStyles.fontSizeVerySmall,
        fontFamily: globalStyles.fontFamilyBold,
        textAlign: "center",
        marginBottom: 10,
        width: "80%",
    }
})
