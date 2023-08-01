import { useContext, useState } from "react"
import { TextInput, View, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from "react-native"

import { Button } from "../components/Button"
import { ComeBack } from "../components/ComeBack"
import { Loading } from "../components/Loading"
import { WarningChangeInformation } from "../components/modals/WarningChangeInformation"
import { DefaultModal } from "../components/modals/DefaultModal"

import { handleNewPicture } from "../handlers/handleNewPicture"
import { handleConfirmNewInformationFillProfile } from "../handlers/handleConfirmNewInformationFillProfile"
import { handleConfirmEmailPhoneChangeFillProfile } from "../handlers/handleConfirmEmailPhoneChangeFillProfile"

import { EditProfilePicture } from "../assets/icons/EditProfilePicture"
import { globalStyles } from "../assets/globalStyles"
import DefaultPicture from "../assets/icons/DefaultPicture.png"

import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import CheckBox from '@react-native-community/checkbox';

export const FillProfile = ({ navigation, route }) => {
    const { isToCreateUser, emailNewUser, passwordNewUser } = route.params ? route.params : {}
    const [isToCreateUserState, setIsToCreateUserState] = useState(isToCreateUser || false)

    const [male, setMale] = useState(false)
    const [fame, setFame] = useState(false)
    const [otherGender, setOtherGender] = useState(false)

    const [informationNewUser, setInformationNewUser] = useState({
        name: "",
        nickname: "",
        email: emailNewUser || "",
        phone: "",
        gender: "",
        profilePicture: null,
    })
    const [error, setModalInfo] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const [modalConfirmationNewInfo, setModalConfirmationNewInfo] = useState(false)

    const { userData, setUserData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const handleConfirmNewInformation = () => {
        handleConfirmNewInformationFillProfile(
            informationNewUser,
            male,
            fame,
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
        handleConfirmEmailPhoneChangeFillProfile(
            informationNewUser,
            userData,
            setModalInfo,
            setInformationNewUser,
            setModalConfirmationNewInfo,
            handleConfirmNewInformation
        )
    }

    if (isLoading) return <Loading flexSize={1} />

    return (
        <ScrollView contentContainerStyle={globalStyles.container}>
            <ComeBack text={"Preencha seu perfil"} />

            <WarningChangeInformation
                modalConfirmationNewInfo={modalConfirmationNewInfo}
                setModalConfirmationNewInfo={setModalConfirmationNewInfo}
                handleNewInformation={handleConfirmNewInformationFillProfile}
            />
            <DefaultModal
                modalContent={error}
            />

            {
                !isToCreateUserState &&
                <Text style={{ color: "#000000", fontFamily: globalStyles.fontFamilyBold, marginVertical: 20, fontSize: globalStyles.fontSizeSmall }}>
                    AVISO: <Text style={{ fontSize: globalStyles.fontSizeSmall, fontFamily: globalStyles.fontFamilyBold }}>Os campos vazios NÂO serão atualizados</Text>
                </Text>
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

                <TouchableOpacity style={styles.contentEditPicture} activeOpacity={.8} onPress={() => handleNewPicture(setInformationNewUser, informationNewUser)}>
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
                    placeholder="Apelido (como devemos te chamar)"
                    placeholderTextColor={"#00000050"}
                    onChangeText={text => setInformationNewUser({ ...informationNewUser, nickname: text })}
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
                    onChangeText={text => setInformationNewUser({ ...informationNewUser, phone: text })}
                    keyboardType="numeric"
                />

                <Text style={{ color: "#000000", fontSize: globalStyles.fontSizeSmall, marginTop: 20, width: "100%", textAlign: "left", fontFamily: globalStyles.fontFamilyBold }}>Gênero</Text>

                <View style={styles.contentGenderOptions}>
                    <View style={styles.contentCheckbox}>
                        <CheckBox
                            tintColors={{ true: globalStyles.orangeColor, false: globalStyles.orangeColor }}
                            disabled={false}
                            value={male}
                            onValueChange={(newValue) => { setMale(newValue), setFame(false), setOtherGender(false) }}
                        />

                        <Text style={styles.text}>Masculino</Text>
                    </View>

                    <View style={[styles.contentCheckbox, { justifyContent: "center" }]}>
                        <CheckBox
                            tintColors={{ true: globalStyles.orangeColor, false: globalStyles.orangeColor }}
                            disabled={false}
                            value={fame}
                            onValueChange={(newValue) => { setFame(newValue), setMale(false), setOtherGender(false) }}
                        />

                        <Text style={styles.text}>Feminino</Text>
                    </View>

                    <View style={styles.contentCheckbox}>
                        <CheckBox
                            tintColors={{ true: globalStyles.orangeColor, false: globalStyles.orangeColor }}
                            disabled={false}
                            value={otherGender}
                            onValueChange={(newValue) => { setOtherGender(newValue), setFame(false), setMale(false) }}
                        />

                        <Text style={styles.text}>Outro</Text>
                    </View>
                </View>

            </View>

            <Button
                text={"Confirmar"}
                action={isToCreateUserState ?
                    handleConfirmNewInformation :
                    handleConfirmEmailPhoneChange
                }
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
})