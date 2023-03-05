import { getMonth, getDay, getYear } from "../helpers/dateHelper";

import { addScheduleWhenDayAlredyUse } from '../../functions/schedules/addScheduleWhenDayAlredyUse';
import { addScheduleWhenDayNotUse } from '../../functions/schedules/addScheduleWhenDayNotUse';
import { addScheduleWhenMonthIsNotUse } from '../../functions/schedules/addScheduleWhenMonthIsNotUse';

import firestore from '@react-native-firebase/firestore';

export const handleComfirmNewSchedule = async (
    schedulesUser,
    userData,
    navigation,
    setSchedulesUser,
) => {

    const scheduleMouth = getMonth(schedulesUser);
    const scheduleDay = getDay(schedulesUser);
    const scheduleYear = getYear(schedulesUser)

    const dateForDoc = `${scheduleMouth}_${scheduleYear}`

    firestore()
        .collection('schedules_month')
        .doc(dateForDoc)
        .get()
        .then(({ _data }) => {
            if (_data === undefined) {
                addScheduleWhenMonthIsNotUse(
                    userData,
                    navigation,
                    schedulesUser,
                    setSchedulesUser,
                );
                return;
            }

            const dayIsAlredyUse = _data[scheduleDay];

            dayIsAlredyUse
                ? addScheduleWhenDayAlredyUse(navigation, userData, schedulesUser)
                : addScheduleWhenDayNotUse(
                    userData,
                    navigation,
                    schedulesUser,
                    setSchedulesUser,
                );
        });
};
