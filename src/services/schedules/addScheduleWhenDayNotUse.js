/**
 * Adds a schedule when the day is not in use.
 * That is, if there is not another schedule with the day selected by user
 *
 * @param {string} userUid - The user UID.
 * @param {object} scheduleInfo - The schedule information.
 * @param {function} setModalContent - The function to set the content of a modal.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 * @param {function} setIsLoading - The function to set the loading state.
 * @param {object} navigation - The navigation object.
 */

import firestore from '@react-native-firebase/firestore';

import {
  getMonth,
  getDay,
  getHour,
  getYear,
} from "../../utils/dateHelper"

import { sendScheduleUidToDB } from './sendScheduleUidToDB';
import { verifySchedulesUid } from './verifySchedulesUid';

import { NewScheduleConfirmation } from '../../assets/imgs/NewScheduleConfirmation';
import { ScheduleUnavailableNow } from '../../assets/imgs/ScheduleUnavailableNow';

export const addScheduleWhenDayNotUse = async (
  userUid,
  scheduleInfo,
  setModalContent,
  setSomethingWrong,
  setIsLoading,
  navigation
) => {
  try {

    const scheduleMonth = getMonth(scheduleInfo);
    const scheduleDay = getDay(scheduleInfo);
    const scheduleHour = getHour(scheduleInfo);
    const scheduleYear = getYear(scheduleInfo)

    const nameDocMonth_Year = `${scheduleMonth}_${scheduleYear}`

    const batch = firestore().batch()

    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(userUid);

    let unavailableTimesData = (await unavailableTimesRef.get()).data() || {}

    // Check if the day selected has a field on the document
    // If `true`, add the schedule in this field
    if (!unavailableTimesData[scheduleDay]) {
      unavailableTimesData = {
        [scheduleDay]: {
          [scheduleInfo.professionalUid]:
            firestore.FieldValue.arrayUnion(scheduleInfo.schedule),
        }
      };
    }

    // Get the schedules by user data
    const schedulesByUserDoc = await schedulesByUserRef.get();
    const schedulesByUserData = schedulesByUserDoc.data();

    const dataToUpdateSchedulesByUser = {
      schedules: [...schedulesByUserData.schedules, { ...scheduleInfo }],
    }

    const schedulesMonthData = (await schedulesMonthRef.get()).data();

    const dataToUpdateSchedulesMonth = {
      ...schedulesMonthData,
      [scheduleDay]: {
        [scheduleInfo.professionalUid]: {
          [scheduleHour]: { ...scheduleInfo },
        },
      },
    }

    // Update the collection
    batch.update(unavailableTimesRef, unavailableTimesData);
    batch.update(schedulesMonthRef, dataToUpdateSchedulesMonth);
    batch.update(schedulesByUserRef, dataToUpdateSchedulesByUser);

    // Check for the last time if the day, time and professional selected by the user is still available
    // If the time is available, add the schedule, if not, show a modal explaining that
    const canConfirmSchedule = await verifySchedulesUid(nameDocMonth_Year, scheduleInfo.scheduleUid);

    if (canConfirmSchedule) {
      sendScheduleUidToDB(nameDocMonth_Year, scheduleInfo.scheduleUid)
      await batch.commit()

      setModalContent({
        image: <NewScheduleConfirmation />,
        mainMessage: "Agendamento Confirmado!",
        message: "Agora é só esperar o dia e comparecer no horário marcado",
        firstButtonText: "Página Inicial",
        firstButtonAction: () => {
          navigation.navigate("Home");
        }
      })
      setIsLoading(false)

      return
    }

    setModalContent({
      image: <ScheduleUnavailableNow width={"100%"} height={300} />,
      mainMessage: "Opa!!, espera um pouco",
      message: "Infelizmente alguém acabou de fazer um agendamento no mesmo horário e dia do que voc. Você terá que refazer o processo.",
      firstButtonText: "Entendi",
      firstButtonAction: () => {
        navigation.navigate("NewSchedule", { headerText: "Agendar Horário", scheduleToUpdate: null, isToUpdateSchedule: null });
      }
    })
    setIsLoading(false)

  } catch (error) {
    console.error('Error adding schedule:', error);
    setSomethingWrong(true)
  }
};
