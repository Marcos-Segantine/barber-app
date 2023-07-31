import firestore from '@react-native-firebase/firestore';

export const getAllTimes = async (setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc("default")
        const workingHoursData = (await workingHoursRef.get()).data()?.times

        if (workingHoursData === undefined) return undefined

        return workingHoursData

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}