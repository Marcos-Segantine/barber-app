import { isValidPhoneNumber } from "./isValidPhoneNumber"
import { isValidEmail } from "./isValidEmail"

import { StopProcessError } from "../assets/imgs/StopProcessError"

export const verifyFieldsToCreateAccount = (userInformation, fields, setError) => {
    for (const field of fields) {
        if (!userInformation[field] || userInformation[field].length === 0) {
            setError({
                image: <StopProcessError />,
                mainMessage: "Campos Vazios",
                message: "Por favor, preencha todos os capos do formulário",
                firstButtonAction: () => setError(null),
                firstButtonText: "Entendi",
            })

            return false
        }
    }

    const isPhoneValid = isValidPhoneNumber(userInformation.phone)
    if (!isPhoneValid) {
        setError({
            image: <StopProcessError />,
            mainMessage: "Telefone inválido",
            message: "Por favor, preencha o campo telefone corretamente",
            firstButtonAction: () => setError(null),
            firstButtonText: "Entendi",
        })

        return false
    }

    const isEmailValid = isValidEmail(userInformation.email)
    if (!isEmailValid) {
        setError({
            image: <StopProcessError />,
            mainMessage: "Email inválido",
            message: "Por favor, preencha o campo email corretamente. Exemplo: exemplo@exemplo.com",
            firstButtonAction: () => setError(null),
            firstButtonText: "Entendi",
        })

        return false
    } else if (userInformation.name.length >= 60) {
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
}
