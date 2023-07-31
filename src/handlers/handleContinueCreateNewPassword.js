import { updatePassword } from "../services/user/updatePassword"

import { StopProcessError } from "../assets/imgs/StopProcessError"

export const handleContinueCreateNewPassword = (
    password,
    confirmPassword,
    setProcessMessage,
    newAccountByMedia,
    setUserData,
    userData,
    mediaEmail,
    navigation,
    setSomethingWrong
) => {

    try {

        if (password.length === 0 || confirmPassword.length === 0) {
            setProcessMessage({
                image: <StopProcessError />,
                mainMessage: "Campo(s) vazio(s)",
                message: "Por favor preencha todos os campos",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setProcessMessage(null)
            })

            return
        }
        else if (password.length < 6) {
            setProcessMessage({
                image: <StopProcessError />,
                mainMessage: "Senha Inválida",
                message: "A senha deve conter no mínimo 6 caracteres",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setProcessMessage(null)
            })

            return
        }
        else if (confirmPassword !== password) {
            setProcessMessage({
                image: <StopProcessError />,
                mainMessage: "Senhas diferentes",
                message: "As senhas que você inseriu não são iguais, por favor tente novamente",
                firstButtonText: "Tentar Novamente",
                firstButtonAction: () => setProcessMessage(null)
            })

            return
        }

        if (newAccountByMedia) {
            setUserData({ ...userData, password: password })
            navigation.navigate("FillProfile", { isToCreateUser: true, emailNewUser: mediaEmail, passwordNewUser: password })
        }
        else {
            if (userData.password === password) {
                setProcessMessage({
                    image: <StopProcessError />,
                    mainMessage: "Mesma senha",
                    message: "A senha que você inseriu é a mesma que você já está usando, caso queria atualiza-lá coloque uma diferente",
                    firstButtonText: "Tentar Novamente",
                    firstButtonAction: () => setProcessMessage(null)
                })

                return
            }

            updatePassword(
                password,
                userData,
                setUserData,
                navigation,
                setSomethingWrong
            )
        }

    } catch (error) {
        console.log(error)
        setSomethingWrong(true);
    }
}