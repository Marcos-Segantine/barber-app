import firestore from "@react-native-firebase/firestore";

import { getLastedScheduleOfClient } from "./getLastedScheduleOfClient";

export const listenerGetLastedScheduleOfClient = (
    userData,
    setScheduleClientInfo,
    setSomethingWrong,
) => {

    if (userData) {
        const docRef = firestore().collection("schedules_by_user").doc(userData.uid);

        docRef.onSnapshot(() => {
            getLastedScheduleOfClient(userData, setScheduleClientInfo, setSomethingWrong);
        });

    }
}