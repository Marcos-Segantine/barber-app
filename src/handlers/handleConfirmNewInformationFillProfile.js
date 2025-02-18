/**
 * Updates the user information or create a new user.
 *
 * @param {object} informationNewUser - The new user(or current user) information.
 * @param {boolean} male - Indicates if the user is male.
 * @param {boolean} fame - Indicates if the user is female.
 * @param {function} setModalInfo - Function to set modal information.
 * @param {string} passwordNewUser - The new user password.
 * @param {object} navigation - The navigation object.
 * @param {function} setIsLoading - Function to set loading state.
 * @param {function} setSomethingWrong - Function to set SomethingWrongContext state if something wrong happen.
 * @param {object} userData - The user data object.
 * @param {function} setUserData - Function to set user data object.
 * @param {boolean} isToCreateUserState - Indicates if it's to create a new user.
 * @param {function} setIsToCreateUserState - Function to set if it's to create a new user state.
 */

import { verifyFieldsToCreateAccount } from "../validation/verifyFieldsToCreateAccount"
import { verifyFieldsToUpdateInformation } from "../validation/verifyFieldsToUpdateInformation"

import { createUserWithEmailAndPassword } from "../services/auth/createUserWithEmailAndPassword"
import { updateInformation } from "../services/user/updateInformation"

import { handleError } from "./handleError"

export const handleConfirmNewInformationFillProfile = async (
    informationNewUser,
    setModalInfo,
    passwordNewUser,
    navigation,
    setIsLoading,
    setSomethingWrong,
    userData,
    setUserData,
    isToCreateUserState,
    setIsToCreateUserState,
) => {

    try {


        // If is to create a new user, verify the fields and create a new user
        if (isToCreateUserState) {
            const isFieldsAvailable = verifyFieldsToCreateAccount(
                informationNewUser,
                ["name", "email", "phone", "gender"],
                setModalInfo,
                setSomethingWrong
            )

            if (!isFieldsAvailable) return

            setIsToCreateUserState(false)

            await createUserWithEmailAndPassword(
                informationNewUser,
                passwordNewUser,
                navigation,
                setIsLoading,
                setModalInfo,
                setSomethingWrong,
            )
        }

        // If is not to create a new user, verify the fields and update the user information
        else {
            const isFieldsValidToUpdateInfo = verifyFieldsToUpdateInformation(
                informationNewUser,
                setModalInfo,
                setSomethingWrong
            )

            if (!isFieldsValidToUpdateInfo) return

            updateInformation(
                informationNewUser,
                userData ? userData.password : null,
                userData.uid,
                navigation,
                setUserData,
                setSomethingWrong,
                isToCreateUserState,
                setIsLoading
            )
        }
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleConfirmNewInformationFillProfile", message)
    }
}
