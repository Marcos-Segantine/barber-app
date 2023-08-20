/**
 * This function finds errors in authentication.
 * 
 * @param {string} email - The email entered by the user.
 * @param {string} password - The password entered by the user.
 * @param {function} setSomethingWrong - The function to set an error when an error happens.
 * @param {function} setIsLoading - The function to set a loading flag.
 * @param {function} setModalContent - The function to set the content of a modal.
 * @param {object} navigation - The navigation object.
 * @returns {boolean} - True if there are no errors, false otherwise.
 */

import firestore from '@react-native-firebase/firestore';

import { isValidEmail } from '../../validation/isValidEmail';

import { StopProcessError } from '../../assets/imgs/StopProcessError';

export const findErrorAuth = async (
    email,
    password,
    setSomethingWrong,
    setIsLoading,
    setModalContent,
    navigation,
) => {
    try {

        setIsLoading(true)
        const usersRef = firestore().collection("users").where("email", "==", email)
        const user = (await usersRef.get()).docs.length ? (await usersRef.get()).docs[0].data() : null

        // Verify if the email and password is empty
        if (!email || !password) {
            setModalContent({
                image: <StopProcessError />,
                mainMessage: "Campos vazios",
                message: "Por favor preencha todos os campos. Caso nao possua uma conta, clique em 'Cadastrar'.",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Cadastrar",
                firstButtonAction: () => setModalContent(null),
                secondButtonAction: () => {
                    navigation.navigate("Register")
                    setModalContent(null)
                }
            })

            setIsLoading(false)

            return
        }

        // Validation of email
        else if (!isValidEmail(email)) {
            setModalContent({
                image: <StopProcessError />,
                mainMessage: "Email inválido",
                message: "O email que você inseriu não é válido, por favor tente novamente. Caso não possua uma conta clique em 'Cadastrar'",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Cadastrar",
                firstButtonAction: () => setModalContent(null),
                secondButtonAction: () => {
                    navigation.navigate("Register")
                    setModalContent(null)
                }
            })

            setIsLoading(false)

            return
        }

        // Verify if a user with the provided email exists
        else if (!user) {
            setModalContent({
                image: <StopProcessError />,
                mainMessage: "Email não cadastrado.",
                message: "Não encontramos seu email, por favor tente novamente. Caso não possua uma conta, clique em 'Cadastrar'.",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Cadastrar",
                firstButtonAction: () => setModalContent(null),
                secondButtonAction: () => {
                    navigation.navigate("Register")
                    setModalContent(null)
                }
            })

            setIsLoading(false)

            return
        }

        // Verify if the password is valid
        else if (password.length < 6) {
            setModalContent({
                image: <StopProcessError />,
                mainMessage: "Senha inválida",
                message: "Senha deve ter no mínimo 6 caracteres, por favor tente novamente. Caso não lembre sua de sua senha clique em 'Esqueci minha senha'.",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Esqueci minha senha",
                firstButtonAction: () => setModalContent(null),
                secondButtonAction: () => {
                    navigation.navigate("ForgotPassword")
                    setModalContent(null)
                }
            })

            setIsLoading(false)

            return
        }

        // Verify if the email and password are correct
        else if (email !== user.email || password !== user.password) {
            setModalContent({
                image: <StopProcessError />,
                mainMessage: "Dados inválidos",
                message: "Email e/ou senha estão incorretos, por favor tente novamente. Caso não lembre sua de sua senha clique em 'Esqueci minha senha'.",
                firstButtonText: "Tentar Novamente",
                secondButtonText: "Esqueci minha senha",
                firstButtonAction: () => setModalContent(null),
                secondButtonAction: () => {
                    navigation.navigate("ForgotPassword")
                    setModalContent(null)
                }
            })

            setIsLoading(false)

            return
        }

        return true

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
}