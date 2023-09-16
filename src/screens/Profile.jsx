import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import { useContext, useState } from "react"

import { UserContext } from "../context/UserContext"
import { SomethingWrongContext } from "../context/SomethingWrongContext"

import { HeaderScreens } from "../components/HeaderScreens"
import { LinkProfile } from "../components/LinkProfile"
import { Menu } from "../components/Menu"
import { DefaultModal } from "../components/modals/DefaultModal"

import { ProfileIcon } from "../assets/icons/ProfileIcon"
import { CheckIcon } from "../assets/icons/CheckIcon"
import { PadlockIcon } from "../assets/icons/PadlockIcon"
import { globalStyles } from "../assets/globalStyles"
import { LogOutIcon } from "../assets/icons/LogOutIcon"
import DefaultPicture from "../assets/icons/DefaultPicture.png"
import { LogOut } from "../assets/imgs/LogOut"

import { logOut } from "../services/user/logOut"

import { getNameLastName } from "../utils/getNameLastName"

export const Profile = ({ navigation }) => {
    const [logOutModalData, setLogOutModalData] = useState(null)

    const { userData } = useContext(UserContext)
    const { setSomethingWrong } = useContext(SomethingWrongContext)

    const handleLogOut = () => {
        setLogOutModalData({
            image: <LogOut />,
            mainMessage: "Realmente deseja sair?",
            firstButtonText: "Sim",
            firstButtonAction: () => {
                setLogOutModalData(null)
                logOut(navigation, setSomethingWrong)
            },
            secondButtonText: "Não",
            secondButtonAction: () => setLogOutModalData(null),
            contentButtonsStyles: { marginTop: "-5%" }
        })
    }

    return (
        <>
            <ScrollView contentContainerStyle={globalStyles.container}>
                <HeaderScreens screenName={"Perfil"} />
                <DefaultModal
                    modalContent={logOutModalData}
                />

                <View style={{ alignItems: 'center' }}>
                    <View>
                        {
                            userData?.profilePicture ?
                                <Image src={userData.profilePicture} style={{ width: 200, height: 200, borderRadius: 150 }} /> :
                                <Image source={DefaultPicture} />

                        }
                    </View>

                    <Text style={styles.userName}>{userData && getNameLastName(userData.name)}</Text>
                    <Text style={styles.userEmail}>{userData && userData.email}</Text>
                </View>

                <View style={styles.content}>

                    <LinkProfile text={"Editar Perfil"} icon={<ProfileIcon />} action={() => navigation.navigate("FillProfile")} />
                    <LinkProfile text={"Segurança"} icon={<CheckIcon />} action={() => navigation.navigate("Security")} />
                    <LinkProfile text={"Política de Privacidade"} icon={<PadlockIcon />} action={() => navigation.navigate("PrivacyPolicies")} />

                    <TouchableOpacity style={styles.logOutLink} onPress={handleLogOut}>
                        <View style={{ flexDirection: 'row' }}>
                            <LogOutIcon />
                            <Text style={styles.logOutText}>Sair</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </ScrollView>

            <Menu />
        </>
    )
}

const styles = StyleSheet.create({
    userName: {
        fontSize: globalStyles.fontSizeMedium,
        fontFamily: globalStyles.fontFamilyBold,
        color: '#000000',
        marginTop: 20,
        marginBottom: 5,
    },

    userEmail: {
        fontSize: globalStyles.fontSizeSmall,
        fontFamily: globalStyles.fontFamilyBold,
        color: '#000000'
    },

    content: {
        flex: 1,
        width: "100%",
        paddingVertical: 30,
    },

    logOutLink: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginVertical: 3,
        paddingHorizontal: 15,
    },

    logOutText: {
        marginLeft: 10,
        fontSize: globalStyles.fontSizeSmall,
        color: '#FF0000'
    }
})