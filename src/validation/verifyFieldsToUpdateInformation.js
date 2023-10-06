import { isValidEmail } from "./isValidEmail"
import { isValidPhoneNumber } from "./isValidPhoneNumber"

import { StopProcessError } from "../assets/imgs/StopProcessError"

import { handleError } from "../handlers/handleError"

export const verifyFieldsToUpdateInformation = (userInformation, setError, setSomethingWrong) => {

    try {

        const isPhoneValid = isValidPhoneNumber(userInformation.phone, setSomethingWrong)
        if (!isPhoneValid && userInformation.phone) {
            setError({
                image: <StopProcessError />,
                mainMessage: "Telefone inválido",
                message: "Por favor, preencha o campo telefone corretamente",
                firstButtonAction: () => setError(null),
                firstButtonText: "Entendi",
            })

            return false
        }

        const isEmailValid = isValidEmail(userInformation.email, setSomethingWrong)
        if (!isEmailValid && userInformation.email) {
            setError({
                image: <StopProcessError />,
                mainMessage: "Email inválido",
                message: "Por favor, preencha o campo email corretamente. Exemplo: exemplo@exemplo.com",
                firstButtonAction: () => setError(null),
                firstButtonText: "Entendi",
            })

            return false
        } else if (userInformation?.name.length >= 60) {
            setError({
                image: <StopProcessError />,
                mainMessage: "Nome muito grande",
                message: "Por favor, insira um nome um pouco menor",
                firstButtonAction: () => setError(null),
                firstButtonText: "Entendi",
            })

            return false
        }

        return true
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("verifyFieldsToUpdateInformation", message)
    }
}
