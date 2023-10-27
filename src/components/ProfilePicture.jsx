import { Image } from "react-native";
import { useContext, useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage";

import DefaultPicture from "../assets/icons/DefaultPicture.png"

import { UserContext } from "../context/UserContext";

import { handleNewPicture } from "../handlers/handleNewPicture";

export const ProfilePicture = ({ canEditProfile = false, argsToEditPicture = null }) => {
    const [profilePictureCached, setProfilePictureCached] = useState(null)

    const { userData } = useContext(UserContext)

    useEffect(() => {

        (async () => {

            setProfilePictureCached(await AsyncStorage.getItem("@barber_app__profile_picture"))

        })();

    }, [])

    if (argsToEditPicture?.informationNewUser?.profilePicture) {
        return (
            <Image
                source={{ uri: `data:image/png;base64,${argsToEditPicture?.informationNewUser?.profilePicture}` }}
                style={{ width: 250, height: 250, borderRadius: 150 }}
            />
        )
    }
    else if (profilePictureCached) {
        return (
            <Image
                source={{ uri: `data:image/png;base64,${profilePictureCached}` }}
                style={{ width: 250, height: 250, borderRadius: 150 }}
            />
        )
    }
    else if (userData?.profilePicture && !argsToEditPicture?.informationNewUser?.profilePicture) {
        return <Image src={userData.profilePicture} style={{ width: 200, height: 200, borderRadius: 150 }} />
    }
    else if (!userData?.profilePicture && !argsToEditPicture?.informationNewUser?.profilePicture) {
        return <Image source={DefaultPicture} />
    }

    return (
        <View style={argsToEditPicture?.informationNewUser?.profilePicture ? { marginTop: 30, } : { backgroundColor: "#FFFFFF", borderRadius: 150, marginTop: 30 }}>
            {
                canEditProfile &&
                <TouchableOpacity
                    style={styles.contentEditPicture}
                    activeOpacity={.8}
                    onPress={() => handleNewPicture({ ...argsToEditPicture })}
                >
                    <EditProfilePicture width={40} height={40} />
                </TouchableOpacity>
            }

        </View>
    )
}