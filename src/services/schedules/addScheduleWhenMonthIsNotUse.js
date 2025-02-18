/**
 * Adds a schedule when the month is not in use.
 * That is, if there is not another schedule with the month selected by user
 * 
 * @param {string} userUid - The user UID.
 * @param {object} scheduleInfo - The schedule information.
 * @param {function} setModalContent - Function to set the modal content.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 * @param {function} setIsLoading - Function to set the loading state.
 * @param {object} navigation - The navigation object.
 */

import firestore from '@react-native-firebase/firestore';

import {
  getMonth,
  getDay,
  getHour,
  getYear,
} from "../../utils/dateHelper"
import { setLastScheduleInDevice } from '../../utils/setLastScheduleInDevice';

import { sendScheduleUidToDB } from './sendScheduleUidToDB';
import { verifySchedulesUid } from './verifySchedulesUid';

import { NewScheduleConfirmation } from '../../assets/imgs/NewScheduleConfirmation';
import { ScheduleUnavailableNow } from '../../assets/imgs/ScheduleUnavailableNow';

import { handleError } from '../../handlers/handleError';

export const addScheduleWhenMonthIsNotUse = async (
  userUid,
  scheduleInfo,
  setModalContent,
  setSomethingWrong,
  setIsLoading,
  navigation
) => {

  try {
    const scheduleMonth = getMonth(scheduleInfo, setSomethingWrong);
    const scheduleHour = getHour(scheduleInfo, setSomethingWrong);
    const scheduleDay = getDay(scheduleInfo, setSomethingWrong);
    const scheduleYear = getYear(scheduleInfo, setSomethingWrong);

    const nameDocMonth_Year = `${scheduleMonth}_${scheduleYear}`

    const batch = firestore().batch();


    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(userUid);
    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);

    // Create schedule_month data object
    const scheduleMonthData = {
      [scheduleDay]: {
        [scheduleInfo.professionalUid]: {
          [scheduleHour]: { ...scheduleInfo },
        },
      },
    };

    // Create unavailable_times data object
    const unavailableTimesData = {
      [scheduleDay]: {
        [scheduleInfo.professionalUid]: [scheduleHour]
      }
    }

    batch.set(schedulesMonthRef, scheduleMonthData);
    batch.set(unavailableTimesRef, unavailableTimesData);
    batch.update(schedulesByUserRef, {
      schedules: firestore.FieldValue.arrayUnion({ ...scheduleInfo }),
    });

    // Check for the last time if the day, time and professional selected by the user is still available
    // If the time is available, add the schedule, if not, show a modal explaining that
    const canConfirmSchedule = await verifySchedulesUid(nameDocMonth_Year, scheduleInfo.scheduleUid, setSomethingWrong);

    if (canConfirmSchedule) {
      sendScheduleUidToDB(nameDocMonth_Year, scheduleInfo.scheduleUid, setSomethingWrong)
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
      await setLastScheduleInDevice(userUid, setSomethingWrong, false)
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

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("addScheduleWhenMonthIsNotUse", message)
  }
};
