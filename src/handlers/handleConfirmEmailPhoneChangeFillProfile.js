import { isValidPhoneNumber } from "../validation/isValidPhoneNumber"
import { isValidEmail } from "../validation/isValidEmail"
import { verifyIfDataAlreadyExist } from "../validation/verifyIfDataAlreadyExist"

import { StopProcessError } from "../assets/imgs/StopProcessError"

export const handleConfirmEmailPhoneChangeFillProfile = async (
    informationNewUser,
    userData,
    setModalInfo,
    setInformationNewUser,
    setModalConfirmationNewInfo,
    handleNewInformation
) => {
    if (informationNewUser.email.trim() ||
        informationNewUser.phone.trim()
    ) {
        const isValidPhone = isValidPhoneNumber(informationNewUser.phone)
        const emailValidated = isValidEmail(informationNewUser.email)

        if (!isValidPhone && !emailValidated) {
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

    const verifyIfFieldsAreSame = () => {
        if (informationNewUser.name.trim() && informationNewUser.name === userData.name) return true
        else if (informationNewUser.email.trim() && informationNewUser.email === userData.email) return true
        else if (informationNewUser.nickname.trim() && informationNewUser.nickname === userData.nickname) return true
        else if (informationNewUser.phone.trim() && informationNewUser.phone === userData.phone) return true
        else if (informationNewUser.gender.trim() && informationNewUser.gender === userData.gender) return true

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

    if (informationNewUser.email || informationNewUser.phone) setModalConfirmationNewInfo(true)
    else handleNewInformation()
}