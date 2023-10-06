/**
 * Handles the continue action for the forgot password feature.
 * 
 * @param {function} setIsLoading - Function to set the loading state.
 * @param {string} email - The email input value.
 * @param {string} phone - The phone input value.
 * @param {function} setModalInfo - Function to set the modal info.
 * @param {function} setSomethingWrong - Function to set the something wrong state.
 * @param {object} navigation - The navigation object.
 * @param {function} clearFields - Function to clear the email and phone fields.
 */

import { StopProcessError } from "../assets/imgs/StopProcessError"

import { isValidPhoneNumber } from "../validation/isValidPhoneNumber"
import { isValidEmail } from "../validation/isValidEmail"

import { sendEmailForgotPassword } from "../services/auth/sendEmailForgotPassword"
import { getUserByEmail } from "../services/user/getUserByEmail"
import { getUserByPhoneNumber } from "../services/user/getUserByPhoneNumber"

import { handleError } from "./handleError"

export const handleContinueForgotPassword = async (
    setIsLoading,
    email,
    phone,
    setModalInfo,
    setSomethingWrong,
    navigation,
    clearFields
) => {

    try {

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
            clearFields()

            return
        }

        // Validate phone and email inputs
        const phoneValidated = isValidPhoneNumber(phone, setSomethingWrong)
        const emailValidated = isValidEmail(email, setSomethingWrong)

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
            clearFields()

            return
        }

        // Check if email exist
        if (email) {
            const user = await getUserByEmail(email);

            if (user === null) {
                setModalInfo({
                    image: <StopProcessError />,
                    mainMessage: "Email não encontrado",
                    message: "Não encontramos o email que você inseriu, por favor verifique-o e tente novamente",
                    firstButtonAction: () => setModalInfo(null),
                    firstButtonText: "Tentar Novamente",
                })
            }

            setIsLoading(false)
            clearFields()

            return
        }

        // Check if email exist
        else if (phone) {
            const user = await getUserByPhoneNumber(phone, setSomethingWrong);

            if (user === null) {
                setModalInfo({
                    image: <StopProcessError />,
                    mainMessage: "Número não encontrado",
                    message: "Não encontramos o número que você inseriu, por favor verifique-o e tente novamente",
                    firstButtonAction: () => setModalInfo(null),
                    firstButtonText: "Tentar Novamente",
                })
            }

            setIsLoading(false)
            clearFields()

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
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("handleContinueForgotPassword", message)
    }
}
