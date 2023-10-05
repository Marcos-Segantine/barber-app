/**
 * Retrieves all professionals from the database.
 * If there is just one professional, call a function to auto select this professional for the user
 *
 * @param {function} handleProfessionalSelected - Function to handle the selected professional.
 * @param {function} setAvailableProfessional - Function to set the available professionals.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 */

import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const getAllProfessionals = async (
    handleProfessionalSelected,
    setAvailableProfessional,
    setSomethingWrong
) => {

    try {

        const barbersRef = firestore().collection("barbers")
        const barbersData = (await barbersRef.get())._docs

        // Create an array of barbers with necessary data
        const barbers = barbersData.map(barber => ({
            name: barber._data.name,
            profilePicture: barber._data.profilePicture,
            professionalUid: barber._data.uid
        }))

        // If only one barber is available, handle it
        if (barbers.length === 1) {
            handleProfessionalSelected({ name: barbers[0].name, professionalUid: barbers[0].professionalUid })
        }

        // Set the professional(s), to show on the screen
        setAvailableProfessional(barbers)

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getAllProfessionals", message)
    }
}
