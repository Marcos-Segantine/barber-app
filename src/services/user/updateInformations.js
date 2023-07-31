import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const updateInformations = async (
    informationNewUser,
    password,
    uid,
    navigation,
    setUserData,
    setSomethingWrong,
    isToCreateUser,
    setIsLoading
) => {
    try {
        setIsLoading(true)


        const schedulesByUserRef = firestore().collection('schedules_by_user').doc(uid)

        const userRef = firestore().collection('users').doc(uid)
        const userData = (await userRef.get()).data()

        const batch = firestore().batch()

        batch.set(schedulesByUserRef, {
            schedules: [],
        })

        if (informationNewUser.profilePicture) {
            const referenceProfilePicture = storage().ref('clients/profilePictures/' + uid);
            await referenceProfilePicture.putString(informationNewUser.profilePicture, 'base64')
        }

        const pic = informationNewUser.profilePicture ? await storage().ref("clients/profilePictures/" + uid).getDownloadURL() : null

        const userDataObj = {
            name: informationNewUser.name || userData.name,
            nickname: informationNewUser.nickname || userData.nickname,
            email: informationNewUser.email || userData.email,
            password: password || userData.password,
            phone: informationNewUser.phone || userData.phone,
            gender: informationNewUser.gender || userData.gender,
            profilePicture: pic || userData.profilePicture,
            uid: uid,
        }

        batch.set(userRef, userDataObj)

        setUserData(userDataObj)

        await batch.commit()

        setIsLoading(false)

        if (isToCreateUser) navigation.navigate("Home")
        else navigation.navigate("Profile")

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}