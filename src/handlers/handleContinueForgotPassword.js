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

    if (!email.trim() && !phone.trim()) {
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

    const phoneValidated = isValidPhoneNumber(phone)
    const emailValidated = isValidEmail(email)

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

    await sendEmailForgotPassword(
        email,
        phone,
        setModalInfo,
        setSomethingWrong,
        navigation
    )

    setIsLoading(false)
}