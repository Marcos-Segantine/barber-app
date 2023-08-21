/**
 * Retrieves the services of a professional.
 * 
 * @param {string} professionalUid - The UID of the professional.
 * @param {function} setSomethingWrong - Function to set a flag indicating if something went wrong.
 * @returns {Array} - An array of objects containing the name and price of each service.
 */

import firestore from '@react-native-firebase/firestore';

export const getServicesOfProfessional = async (professionalUid, setSomethingWrong) => {
    try {

        const servicesRef = firestore().collection("services").doc(professionalUid)
        const servicesData = (await servicesRef.get()).data()

        // Extract the professional services
        const professionalServices = servicesData.services

        // Create an array to store the extracted services
        const data = []

        // Loop through each service and extract the name and price
        for (const service in professionalServices) {
            data.push({
                name: professionalServices[service].name,
                price: professionalServices[service].price
            })
        }

        return data

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
}