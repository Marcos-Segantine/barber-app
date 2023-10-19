import AsyncStorage from "@react-native-async-storage/async-storage"

import { takeLastScheduleOfUser } from "../services/user/takeLastScheduleOfUser"

export const setLastScheduleInDevice = async (uid, setSomethingWrong, isToRemove) => {
    console.log(isToRemove, 'isToRemove');

    if (isToRemove) {
        await AsyncStorage.removeItem("@barber_app__lastSchedule")
        return
    }
    await AsyncStorage.setItem("@barber_app__lastSchedule", JSON.stringify(await takeLastScheduleOfUser(uid, setSomethingWrong)) || "null")
}