/**
 * Handles the confirmation of email or phone change by filling the user's profile.
 * 
 * @param {Object} informationNewUser - The new user information.
 * @param {Object} userData - The existing user information.
 * @param {Function} setModalInfo - The function to set the modal information.
 * @param {Function} setInformationNewUser - The function to set the new user information.
 * @param {Function} setModalConfirmationNewInfo - The function to set the modal confirmation for new information.
 * @param {Function} handleNewInformation - The function to handle the new information.
 */

import { isValidPhoneNumber } from "../validation/isValidPhoneNumber"
import { isValidEmail } from "../validation/isValidEmail"
import { verifyIfDataAlreadyExist } from "../validation/verifyIfDataAlreadyExist"

import { StopProcessError } from "../assets/imgs/StopProcessError"

import { handleError } from "./handleError"

export const handleConfirmEmailPhoneChangeFillProfile = async (
    informationNewUser,
    userData,
    setModalInfo,
    setInformationNewUser,
    setModalConfirmationNewInfo,
    handleNewInformation
) => {

    try {

        if (informationNewUser.email ||
            informationNewUser.phone
        ) {
            // Verify if email and phone number is valid
            const isValidPhone = isValidPhoneNumber(informationNewUser.phone)
            const emailValidated = isValidEmail(informationNewUser.email)

            if (!isValidPhone && !emailValidated) {

                // Show error message if email and phone number if wrong
                setModalInfo({
                    image: <StopProcessError />,
                    mainMessage: "Campo(s) Inválido(s)",
                    message: "Por favor preencha o(s) campo(s) corretamente",
                    firstButtonAction: () => setModalInfo(null),
                    firstButtonText: "Entendi",
                })
                return
            }
        }

        // Verify if there are fields that is already use by user
        const verifyIfFieldsAreSame = () => {
            if (informationNewUser.name === userData.name) return true
            else if (informationNewUser.email === userData.email) return true
            else if (informationNewUser.phone === userData.phone) return true
            else if (informationNewUser.gender === userData.gender) return true

            return false
        }

        const fieldsAreSame = verifyIfFieldsAreSame()

        if (fieldsAreSame) {
            setModalInfo({
                image: <StopProcessError />,
                mainMessage: "Nenhuma atualização",
                message: "Há campos que continuam sendo os mesmos, altere-os para que sejam atualizados",
                firstButtonAction: () => setModalInfo(null),
                firstButtonText: "Entendi",
            })

            return
        }

        // Verify if email and phone number is already use by other user
        const emailAlreadyExist = await verifyIfDataAlreadyExist("email", informationNewUser.email)
        const phoneAlreadyExist = await verifyIfDataAlreadyExist("phone", informationNewUser.phone)

        if (emailAlreadyExist) {
            setModalInfo({
                image: <StopProcessError />,
                mainMessage: "Este email já esta em uso",
                message: "Por favor escolha um email diferente",
                firstButtonAction: () => {
                    setModalInfo(null)
                    setInformationNewUser({ ...informationNewUser, email: "" })
                },
                firstButtonText: "Tentar Novamente",
            })

            setInformationNewUser({ ...informationNewUser, email: "" })

            return
        }
        else if (phoneAlreadyExist) {
            setModalInfo({
                image: <StopProcessError />,
                mainMessage: "Este telefone já esta em uso",
                message: "Por favor escolha um telefone diferente",
                firstButtonAction: () => {
                    setModalInfo(null)
                    setInformationNewUser({ ...informationNewUser, phone: "" })
                },
                firstButtonText: "Tentar Novamente",
            })

            setInformationNewUser({ ...informationNewUser, phone: "" })

            return
        }

        // If the data is valid show a modal to user to confirm the new information
        else if (informationNewUser.email || informationNewUser.phone) setModalConfirmationNewInfo(true)

        // Updates the user information
        else handleNewInformation()
    } catch ({ message }) {
        handleError("handleConfirmEmailPhoneChangeFillProfile", message)
    }
}
