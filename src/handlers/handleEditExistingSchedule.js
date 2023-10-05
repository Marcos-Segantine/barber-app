/**
 * Handles editing an existing schedule.
 * 
 * @param {object} scheduleToChange - The schedule to be changed.
 * @param {object} newSchedule - The new schedule data.
 * @param {function} setNewSchedule - Function to set the new schedule state.
 * @param {function} setModalContent - Function to set the modal content.
 * @param {function} setSomethingWrong - Function to set if something went wrong.
 * @param {function} setIsLoading - Function to set if the operation is loading.
 * @param {object} navigation - The navigation object.
 */

import { cancelSchedule } from '../services/schedules/cancelSchedule';

import { handleConfirmNewSchedule } from './handleConfirmNewSchedule';
import { handleError } from './handleError';

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

        // Cancel the existing schedule.
        await cancelSchedule(
            scheduleToChange.clientUid,
            scheduleToChange,
            setSomethingWrong
        )

        // Add a new schedule.
        await handleConfirmNewSchedule(
            newSchedule,
            setNewSchedule,
            newSchedule.clientUid,
            setModalContent,
            setSomethingWrong,
            setIsLoading,
            navigation
        )

        // Clear the newSchedule state
        setNewSchedule({})
        
        setIsLoading(false)

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleEditExistingSchedule", message)
    }
}
