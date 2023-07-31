import { cancelSchedule } from '../services/schedules/cancelSchedule';
import { handleConfirmNewSchedule } from './handleConfirmNewSchedule';

export const handleEditExistingSchedule = async (
    scheduleToChange,
    newSchedule,
    setNewSchedule,
    setModalContent,
    setSomethingWrong,
    setIsLoading,
    navigation
) => {
    try {
        await cancelSchedule(
            scheduleToChange.clientUid,
            scheduleToChange
        )
        await handleConfirmNewSchedule(
            newSchedule,
            newSchedule.clientUid,
            setModalContent,
            setSomethingWrong,
            setIsLoading,
            navigation
        )

        setNewSchedule({})
        setIsLoading(false)

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
}
