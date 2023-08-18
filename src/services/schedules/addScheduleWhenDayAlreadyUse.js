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

    // collections reference
    const schedulesMonthRef = firestore().collection('schedules_month').doc(nameDocMonth_Year);
    const unavailableTimesRef = firestore().collection('unavailable_times').doc(nameDocMonth_Year);
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(clientUid);

    const batch = firestore().batch();

    // getting data from collections
    const schedulesMonthData = (await schedulesMonthRef.get({ source: "server" })).data();
    const unavailableTimesData = (await unavailableTimesRef.get({ source: "server" })).data()[scheduleDay][scheduleInfo.professionalUid];
    const schedulesByUserData = (await schedulesByUserRef.get({ source: "server" })).data()

    // if alredy have a field for the professional selected, just add the `schedule` data
    if (schedulesMonthData[scheduleDay][scheduleInfo.professionalUid]) {

      // creating const to store data that will be used to update the collections
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
    // else create a new doc with the field
    else {

      // creating const to store data that will be used to update the collections
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

    const updatedSchedulesByUser = {
      schedules: [...schedulesByUserData.schedules, scheduleInfo],
    };

    batch.update(schedulesByUserRef, updatedSchedulesByUser);

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
