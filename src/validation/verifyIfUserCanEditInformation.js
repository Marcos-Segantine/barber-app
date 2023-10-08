import { handleError } from "../handlers/handleError"

import { StopProcessError } from "../assets/imgs/StopProcessError"

export const verifyIfUserCanEditInformation = (
    userEditedCounter,
    setModalInfo,
    setContact,
    navigation,
    informationNewUser,
    setSomethingWrong
) => {
    try {
        // Return true if user can change your information

        const fields = Object.keys(informationNewUser)

        let noUpdated = true

        for (const field of fields) {
            if (informationNewUser[field]) noUpdated = false
        }

        if (noUpdated) {
            navigation.goBack()
            return
        }

        if (userEditedCounter > 0) return true

        setModalInfo({
            image: <StopProcessError />,
            mainMessage: "Ação não permitida",
            message: "Você não pode mais editar suas informações. Caso precise você pode entrar em contato conosco.",
            firstButtonText: "Contato",
            firstButtonAction: () => {
                setContact(true)
                setModalInfo(null)
            },
            secondButtonText: "Cancelar",
            secondButtonAction: () => setModalInfo(null)
        })

        return false

    } catch ({ message }) {
        handleError("verifyIfUserCanEditInformation", message)
        setSomethingWrong(true)
    }
}