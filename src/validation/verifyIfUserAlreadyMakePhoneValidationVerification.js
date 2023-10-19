import AsyncStorage from "@react-native-async-storage/async-storage"

export const verifyIfUserAlreadyMakePhoneValidationVerification = async (setTimer) => {
    const time = await AsyncStorage.getItem("@barber_app__timeToWaitAfterAnotherRequisition")

    if (+time === 0) setTimer(0)
    return setTimer(+time * 60)
}