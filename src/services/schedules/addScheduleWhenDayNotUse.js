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
  clientUid,
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


    // collections reference
    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(clientUid);

    let unavailableTimesData = (await unavailableTimesRef.get()).data() || {}

    // if day selected have a field on doc
    if (!unavailableTimesData[scheduleDay]) {
      unavailableTimesData = {
        [scheduleDay]: {
          [scheduleInfo.professionalUid]:
            firestore.FieldValue.arrayUnion(scheduleInfo.schedule),
        }
      };
    }

    const schedulesByUserDoc = await schedulesByUserRef.get();
    const schedulesByUserData = schedulesByUserDoc.data();

    // creating const to update collections
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

    batch.update(unavailableTimesRef, unavailableTimesData);
    batch.update(schedulesMonthRef, dataToUpdateSchedulesMonth);
    batch.update(schedulesByUserRef, dataToUpdateSchedulesByUser);

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
    console.error('Error adding schedule:', error);
    setSomethingWrong(true)
  }
};
