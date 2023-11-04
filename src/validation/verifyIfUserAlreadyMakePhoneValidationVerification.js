import AsyncStorage from "@react-native-async-storage/async-storage"
import { handleError } from "../handlers/handleError"

export const verifyIfUserAlreadyMakePhoneValidationVerification = async (setTimer, setSomethingWrong) => {
    try {
        const time = await AsyncStorage.getItem("@barber_app__timeToWaitAfterAnotherRequisition")

        if (+time === 0) setTimer(0)
        return setTimer(+time * 60)

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("verifyIfUserAlreadyMakePhoneValidationVerification", message)
    }
}