/**
 * Handle confirmation of a new schedule.
 * 
 * @param {Object} scheduleInfo - The schedule information.
 * @param {Function} setScheduleInfo - The function to update the schedule information state.
 * @param {string} clientUid - The client(user) UID.
 * @param {Function} setModalContent - The function to set the content of the modal.
 * @param {Function} setSomethingWrong - The function to set if something went wrong.
 * @param {Function} setIsLoading - The function to set the loading state.
 * @param {Object} navigation - The navigation object.
 */

import { getMonth, getDay, getYear } from "../utils/dateHelper";

import { addScheduleWhenDayAlreadyUse } from "../services/schedules/addScheduleWhenDayAlreadyUse";
import { addScheduleWhenDayNotUse } from "../services/schedules/addScheduleWhenDayNotUse";
import { addScheduleWhenMonthIsNotUse } from "../services/schedules/addScheduleWhenMonthIsNotUse";
import { updateLastActivity } from "../services/user/updateLastActivity";

import firestore from "@react-native-firebase/firestore";

import { handleError } from "./handleError";

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

        const scheduleMouth = getMonth(scheduleInfo, setSomethingWrong);
        const scheduleDay = getDay(scheduleInfo, setSomethingWrong);
        const scheduleYear = getYear(scheduleInfo, setSomethingWrong)

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

        updateLastActivity(clientUid, setSomethingWrong)
        setScheduleInfo({})

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleConfirmNewSchedule", message)
    }
};
