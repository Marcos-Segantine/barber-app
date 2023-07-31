import { verifyFieldsToCreateAccount } from "../validation/verifyFieldsToCreateAccount"
import { verifyFieldsToUpdateInformation } from "../validation/verifyFieldsToUpdateInformation"

import { createUserWithEmailAndPassword } from "../services/auth/createUserWithEmailAndPassword"
import { updateInformations } from "../services/user/updateInformations"

export const handleConfirmNewInformationFillProfile = async (
    informationNewUser,
    male,
    fame,
    setModalInfo,
    passwordNewUser,
    navigation,
    setIsLoading,
    setSomethingWrong,
    userData,
    setUserData,
    isToCreateUserState,
    setIsToCreateUserState
) => {
    const returnGender = async () => {
        if (male) return "Masculino"
        else if (fame) return "Feminino"
        else return "Outro"
    }

    const gender = await returnGender()

    if (isToCreateUserState) {
        const isFieldsAvailable = verifyFieldsToCreateAccount(
            { ...informationNewUser, gender, },
            ["name", "nickname", "email", "phone", "gender"],
            setModalInfo
        )

        if (!isFieldsAvailable) return

        setIsToCreateUserState(false)

        await createUserWithEmailAndPassword(
            { ...informationNewUser, gender, },
            passwordNewUser,
            navigation,
            setIsLoading,
            setModalInfo,
            setSomethingWrong,
        )
    }
    else {
        const isFieldsValidToUpdateInfo = verifyFieldsToUpdateInformation(
            { ...informationNewUser, gender, },
            setModalInfo
        )

        if (!isFieldsValidToUpdateInfo) return

        updateInformations(
            { ...informationNewUser, gender },
            userData ? userData.password : null,
            userData.uid,
            navigation,
            setUserData,
            setSomethingWrong,
            isToCreateUserState,
            setIsLoading
        )
    }
}
