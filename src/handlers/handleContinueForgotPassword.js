/**
 * Handles the continue action for the forgot password feature.
 * 
 * @param {function} setIsLoading - Function to set the loading state.
 * @param {string} email - The email input value.
 * @param {string} phone - The phone input value.
 * @param {function} setModalInfo - Function to set the modal info.
 * @param {function} setSomethingWrong - Function to set the something wrong state.
 * @param {object} navigation - The navigation object.
 */

import { StopProcessError } from "../assets/imgs/StopProcessError"
import { isValidPhoneNumber } from "../validation/isValidPhoneNumber"
import { isValidEmail } from "../validation/isValidEmail"
import { sendEmailForgotPassword } from "../services/auth/sendEmailForgotPassword"

export const handleContinueForgotPassword = async (
    setIsLoading,
    email,
    phone,
    setModalInfo,
    setSomethingWrong,
    navigation,
) => {
    setIsLoading(true)

    // Check if both email and phone inputs are empty
    if (!email && !phone) {
        setModalInfo({
            image: <StopProcessError />,
            mainMessage: "Campo(s) vazios",
            message: "Por favor, preencha pelo menos um dos campos para que possamos identificar-lo",
            firstButtonAction: () => setModalInfo(null),
            firstButtonText: "Tentar Novamente",
        })

        setIsLoading(false)
        return
    }

    // Validate phone and email inputs
    const phoneValidated = isValidPhoneNumber(phone)
    const emailValidated = isValidEmail(email)

    // Check if phone and email inputs are invalid
    if (!phoneValidated && !emailValidated) {
        setModalInfo({
            image: <StopProcessError />,
            mainMessage: "Campo(s) inválidos",
            message: "Por favor, preencha os campos corretamente para que possamos identificar-lo",
            firstButtonAction: () => setModalInfo(null),
            firstButtonText: "Tentar Novamente",
        })

        setIsLoading(false)
        return
    }

    // Send email for user reset password
    await sendEmailForgotPassword(
        email,
        phone,
        setModalInfo,
        setSomethingWrong,
        navigation
    )

    setIsLoading(false)
}
