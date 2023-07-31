import firestore from '@react-native-firebase/firestore';

export const getServicesOfProfessional = async (professionalUid, setSomethingWrong) => {
    try {

        const servicesRef = firestore().collection("services").doc(professionalUid)
        const servicesData = (await servicesRef.get()).data()

        const professionalServices = servicesData.services
        const data = []

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