/**
 * Adds a schedule when the day selected is already in use.
 * That is, If in the database already has a another schedule in the same day
 * 
 * @param {string} userUid - The UID of the user.
 * @param {object} scheduleInfo - The schedule information.
 * @param {function} setModalContent - The function to set the content of a modal.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 * @param {function} setIsLoading - The function to set a flag indicating if the app is loading.
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

export const addScheduleWhenDayAlreadyUse = async (
  userUid,
  scheduleInfo,
  setModalContent,
  setSomethingWrong,
  setIsLoading,
  navigation
) => {

  try {
    // Extracting schedule information
    const scheduleMonth = getMonth(scheduleInfo);
    const scheduleDay = getDay(scheduleInfo);
    const scheduleHour = getHour(scheduleInfo);
    const scheduleYear = getYear(scheduleInfo)

    const nameDocMonth_Year = `${scheduleMonth}_${scheduleYear}`

    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(userUid);

    const batch = firestore().batch();

    const schedulesMonthData = (await schedulesMonthRef.get({ source: "server" })).data();
    const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()[scheduleDay][scheduleInfo.professionalUid];
    const schedulesByUserData = (await schedulesByUserRef.get({ source: "server" })).data()

    // If there is already a field for the selected professional, just add the schedule data
    if (schedulesMonthData[scheduleDay][scheduleInfo.professionalUid]) {

      // Creating data to update the collections
      const dataToUpdateSchedulesMonth = {
        [`${scheduleDay}.${scheduleInfo.professionalUid}.${scheduleHour}`]: scheduleInfo,
      }

      const dataToUpdateUnavailableTimes = {
        [scheduleDay]: {
          [scheduleInfo.professionalUid]:
            [...unavailableTimesData, scheduleHour]
        }
      }

      batch.update(schedulesMonthRef, dataToUpdateSchedulesMonth);
      batch.update(unavailableTimesRef, dataToUpdateUnavailableTimes);

    }
    else {

      // Creating data to update the collections
      const dataToUpdateSchedulesMonth = {
        [scheduleDay]: {
          [scheduleInfo.professionalUid]: {
            [scheduleHour]: scheduleInfo,
          }
        }
      }

      const dataToUpdateUnavailableTimes = {
        [scheduleDay]: {
          [scheduleInfo.professionalUid]: [scheduleInfo.schedule],
        }
      }

      batch.set(
        schedulesMonthRef,
        dataToUpdateSchedulesMonth,
        { merge: true },
      );

      batch.set(
        unavailableTimesRef,
        dataToUpdateUnavailableTimes,
        { merge: true },
      );
    }

    // Updating schedules by user data
    const updatedSchedulesByUser = {
      schedules: [...schedulesByUserData.schedules, scheduleInfo],
    };

    batch.update(schedulesByUserRef, updatedSchedulesByUser);

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
        firstButtonText: "Confirmar",
        firstButtonAction: () => {
          navigation.navigate("Home");
        }
      })
      setIsLoading(false)

      return
    }

    setModalContent({
      image: <ScheduleUnavailableNow />,
      mainMessage: "Opa!!, espera um pouco",
      message: "Infelizmente alguém acabou de fazer um agendamento no mesmo horário e dia do que voc. Você terá que refazer o processo.",
      firstButtonText: "Entendi",
      firstButtonAction: () => {
        navigation.navigate("NewSchedule", { headerText: "Agendar Horário", scheduleToUpdate: null, isToUpdateSchedule: null });
      }
    })
    setIsLoading(false)

  } catch (error) {
    console.error(error);
    setSomethingWrong(true)
  }
};
