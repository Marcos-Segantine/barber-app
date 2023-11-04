import AsyncStorage from "@react-native-async-storage/async-storage"

import { takeLastScheduleOfUser } from "../services/user/takeLastScheduleOfUser"
import { handleError } from "../handlers/handleError"

export const setLastScheduleInDevice = async (uid, setSomethingWrong, isToRemove) => {
    try {
        if (isToRemove) {
            await AsyncStorage.removeItem("@barber_app__lastSchedule")
            return
        }
        await AsyncStorage.setItem("@barber_app__lastSchedule", JSON.stringify(await takeLastScheduleOfUser(uid, setSomethingWrong)) || "null")
        
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("setLastScheduleInDevice", message)
    }
}