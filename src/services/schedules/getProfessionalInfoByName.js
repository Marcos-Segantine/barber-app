/**
 * Retrieves professional information by name and sets the professional picture.
 * 
 * @param {string} professionalName - The name of the professional.
 * @param {function} setProfessionalPicture - The function to set the professional picture.
 */

import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const getProfessionalInfoByName = async (
    professionalName,
    setProfessionalPicture
) => {

    try {


        const barbersRef = firestore().collection('barbers').where('name', '==', professionalName)
        const barbersData = (await barbersRef.get({ source: "server" })).docs

        // Check if there is one barber with the given name
        const barber = barbersData.length > 0 ? barbersData[0].data() : null

        // Set the professional picture based on the retrieved barber's data
        // If there is no barber with the given name, set the professional picture to null
        // Otherwise, set the professional picture
        if (!barber) setProfessionalPicture(null)
        else setProfessionalPicture(barber.profilePicture);
    } catch ({ message }) {
        handleError("getProfessionalInfoByName", message)
    }
}
