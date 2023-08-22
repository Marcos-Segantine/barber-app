/**
 * Handle the continue create new password action.
 * 
 * @param {string} password - The new password.
 * @param {string} confirmPassword - The confirmation of the new password.
 * @param {function} setProcessMessage - Function to set the process message.
 * @param {boolean} newAccountByMedia - Flag indicating if it's a new account created by media(Google, Facebook or Apple).
 * @param {function} setUserData - Function to set the user data.
 * @param {object} userData - The user data.
 * @param {string} mediaEmail - The media email.
 * @param {object} navigation - The navigation object.
 * @param {function} setSomethingWrong - Function to set the flag indicating if something went wrong.   
 */

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

        // Check if password or confirmPassword is empty
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

        // Check if password is less than 6 characters
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

        // Check if confirmPassword is different from password
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

        // If it's a new account created by media
        if (newAccountByMedia) {
            setUserData({ ...userData, password: password })
            navigation.navigate("FillProfile", { isToCreateUser: true, emailNewUser: mediaEmail, passwordNewUser: password })
        }
        // Check if the new password is the same as the current password
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