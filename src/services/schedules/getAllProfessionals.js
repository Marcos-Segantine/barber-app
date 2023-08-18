import firestore from '@react-native-firebase/firestore';

export const getAllProfessionals = async (
    handleProfessionalSelected,
    setAvailableProfessional,
    setSomethingWrong) => {

    try {

        const barbersRef = firestore().collection("barbers")
        const barbersData = (await barbersRef.get())._docs

        const barbers = barbersData.map(barber => ({ name: barber._data.name, profilePicture: barber._data.profilePicture, professionalUid: barber._data.uid }))

        if (barbers.length === 1) {
            handleProfessionalSelected({ name: barbers[0].name, professionalUid: barbers[0].professionalUid })
        }

        setAvailableProfessional(barbers)

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}