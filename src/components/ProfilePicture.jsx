import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserContext } from "../context/UserContext";

import { handleNewPicture } from "../handlers/handleNewPicture";

import { EditProfilePicture } from "../assets/icons/EditProfilePicture";
import { globalStyles } from "../assets/globalStyles";
import DefaultPicture from "../assets/icons/DefaultPicture.png"

export const ProfilePicture = ({ canEditProfile = false, argsToEditPicture = null, isCreatingUser = false }) => {
    const [profilePictureCached, setProfilePictureCached] = useState(null)

    const { userData } = useContext(UserContext)

    useEffect(() => {

        (async () => {

            setProfilePictureCached(await AsyncStorage.getItem("@barber_app__profile_picture"))

        })();

    }, [])

    if (argsToEditPicture?.informationNewUser?.profilePicture) {
        return (
            <View style={styles.contentPicture}>
                <Image
                    source={{ uri: `data:image/png;base64,${argsToEditPicture?.informationNewUser?.profilePicture}` }}
                    style={styles.img}
                />

                {
                    (canEditProfile || isCreatingUser) &&
                    (
                        <TouchableOpacity
                            style={styles.contentEditPicture}
                            activeOpacity={.8}
                            onPress={() => handleNewPicture(
                                argsToEditPicture.setInformationNewUser,
                                argsToEditPicture.informationNewUser,
                                argsToEditPicture.setModalInfo,
                                argsToEditPicture.setModalInformative,
                                argsToEditPicture.setSomethingWrong,
                            )}
                        >
                            <EditProfilePicture width={40} height={40} />
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }
    if (profilePictureCached) {
        return (
            <View style={styles.contentPicture}>
                <Image
                    source={{ uri: `data:image/png;base64,${profilePictureCached}` }}
                    style={styles.contentPicture}
                />

                {
                    (canEditProfile || isCreatingUser) &&
                    (
                        <TouchableOpacity
                            style={styles.contentEditPicture}
                            activeOpacity={.8}
                            onPress={() => handleNewPicture(
                                argsToEditPicture.setInformationNewUser,
                                argsToEditPicture.informationNewUser,
                                argsToEditPicture.setModalInfo,
                                argsToEditPicture.setModalInformative,
                                argsToEditPicture.setSomethingWrong,
                            )}
                        >
                            <EditProfilePicture width={40} height={40} />
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }

    return (
        <View style={styles.contentPicture}>
            {
                profilePictureCached ?
                    <Image source={{ uri: `data:image/png;base64,${profilePictureCached}` }} /> :
                    <Image source={DefaultPicture} style={styles.img} />
            }

            {
                (canEditProfile || isCreatingUser) &&
                (
                    <TouchableOpacity
                        style={styles.contentEditPicture}
                        activeOpacity={.8}
                        onPress={() => handleNewPicture(
                            argsToEditPicture.setInformationNewUser,
                            argsToEditPicture.informationNewUser,
                            argsToEditPicture.setModalInfo,
                            argsToEditPicture.setModalInformative,
                            argsToEditPicture.setSomethingWrong,
                        )}
                    >
                        <EditProfilePicture width={40} height={40} />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    contentPicture: {
        width: 200,
        height: 200,
        borderRadius: 150,
        marginTop: 20,
    },

    contentEditPicture: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: globalStyles.orangeColor,
        position: "absolute",
        bottom: 0,
        right: 10,
        borderRadius: 10,
    },
    img: {
        width: "100%",
        height: "100%",
        borderRadius: 150,
    },
})