import firestore from '@react-native-firebase/firestore';

export const getProfessionalInfoByName = async (professionalName, setProfessionalPicture) => {

    const barbersRef = firestore().collection('barbers').where('name', '==', professionalName)
    const barbersData = (await barbersRef.get({ source: "server" })).docs

    const barber = barbersData.length > 0 ? barbersData[0].data() : null

    if (!barber) setProfessionalPicture(null)
    else setProfessionalPicture(barber.profilePicture);
}