import { getMonth, getDay, getYear } from "../utils/dateHelper";

import { addScheduleWhenDayAlreadyUse } from "../services/schedules/addScheduleWhenDayAlreadyUse";
import { addScheduleWhenDayNotUse } from "../services/schedules/addScheduleWhenDayNotUse";
import { addScheduleWhenMonthIsNotUse } from "../services/schedules/addScheduleWhenMonthIsNotUse";

import firestore from "@react-native-firebase/firestore";

export const handleConfirmNewSchedule = async (
    scheduleInfo,
    setScheduleInfo,
    clientUid,
    setModalContent,
    setSomethingWrong,
    setIsLoading,
    navigation
) => {

    try {

        const scheduleMouth = getMonth(scheduleInfo);
        const scheduleDay = getDay(scheduleInfo);
        const scheduleYear = getYear(scheduleInfo)

        const dateForDoc = `${scheduleMouth}_${scheduleYear}`

        const schedulesMonthRef = firestore().collection("schedules_month").doc(dateForDoc)
        const schedulesMonthData = (await schedulesMonthRef.get()).data()

        if (schedulesMonthData === undefined) {
            await addScheduleWhenMonthIsNotUse(
                clientUid,
                scheduleInfo,
                setModalContent,
                setSomethingWrong,
                setIsLoading,
                navigation
            );
            return;
        }

        const dayIsAlreadyUse = schedulesMonthData[scheduleDay]

        dayIsAlreadyUse
            ? await addScheduleWhenDayAlreadyUse(
                clientUid,
                scheduleInfo,
                setModalContent,
                setSomethingWrong,
                setIsLoading,
                navigation
            )
            : await addScheduleWhenDayNotUse(
                clientUid,
                scheduleInfo,
                setModalContent,
                setSomethingWrong,
                setIsLoading,
                navigation
            );

        setScheduleInfo({})

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
};
