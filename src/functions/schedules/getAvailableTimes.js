import firestore from '@react-native-firebase/firestore';

import {
    getProfessional,
    getDay,
    getMonth,
    getYear,
} from '../../functions/helpers/dateHelper';

export const getAvailableTimes = async (shedulesUser, setAvailableTimes) => {
    const year = getYear(shedulesUser);
    const month = getMonth(shedulesUser);
    const day = getDay(shedulesUser);
    const professional = getProfessional(shedulesUser);

    try {
        const workingHoursSnapshot = await firestore()
            .collection('working_hours')
            .get();
        const workingHours = workingHoursSnapshot.docs.map(
            doc => doc.data().times,
        );

        const unavailableTimesSnapshot = await firestore()
            .collection('unavailable_times')
            .doc(`${month}_${year}`)
            .get();

        const unavailableTimes = unavailableTimesSnapshot.data() || {};

        const dayOfWeek = new Date(shedulesUser.day).getDay() + 1;

        let availableTimes = [];

        if (dayOfWeek > 0 && dayOfWeek <= 5) {
            availableTimes = workingHours[2];
        } else if (dayOfWeek === 6) {
            availableTimes = workingHours[0];
        } else {
            availableTimes = workingHours[1];
        }

        const unavailableTimesForDayAndProfessional =
            unavailableTimes[day]?.[professional] || [];

        availableTimes = availableTimes.filter(
            time => !unavailableTimesForDayAndProfessional.includes(time),
        );

        setAvailableTimes(availableTimes);
    } catch (error) {
        console.error(error);
    }
};