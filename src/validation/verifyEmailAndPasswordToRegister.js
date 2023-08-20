import firestore from '@react-native-firebase/firestore';

import { isValidEmail } from './isValidEmail';

import { StopProcessError } from '../assets/imgs/StopProcessError';

export const verifyEmailAndPasswordToRegister = async (
    email,
    password,
    navigation,
    setModalContent,
    setIsLoading
) => {
    const usersRef = firestore().collection('users').where("email", "==", email);
    const usersData = await usersRef.get();

    if (!email || !password) {
        setModalContent({
            image: <StopProcessError />,
            mainMessage: "Campos vazios",
            message: "Por favor preencha todos os campos. Ou faça login",
            firstButtonText: "Tentar Novamente",
            secondButtonText: "Login",
            firstButtonAction: () => setModalContent(null),
            secondButtonAction: () => {
                navigation.navigate("Login")
                setModalContent(null)
            }
        })

        setIsLoading(false)

        return false
    }
    else if (usersData.docs.length > 0) {
        setModalContent({
            image: <StopProcessError />,
            mainMessage: "Email em uso",
            message: "O email que você inseriu já está em uso, por favor tente novamente. Ou faça login.",
            firstButtonText: "Tentar Novamente",
            secondButtonText: "Login",
            firstButtonAction: () => setModalContent(null),
            secondButtonAction: () => {
                navigation.navigate("Login")
                setModalContent(null)
            }
        })

        setIsLoading(false)

        return false
    }

    else if (password.length < 6) {
        setModalContent({
            image: <StopProcessError />,
            mainMessage: "Senha inválida",
            message: "A senha que você inseriu é inválida,  a senha deve conter pelo menos 6 digitos.",
            firstButtonText: "Tentar Novamente",
            secondButtonText: "Cadastrar",
            firstButtonAction: () => setModalContent(null),
            secondButtonAction: () => {
                navigation.navigate("Register")
                setModalContent(null)
            }
        })

        setIsLoading(false)

        return false
    }
    else if (!isValidEmail(email)) {
        setModalContent({
            image: <StopProcessError />,
            mainMessage: "Seu email é inválido",
            message: "O formato do email que você inseriu está incorreto. Exemplo de um email válido: exemplo@exemplo.com",
            firstButtonText: "Tentar Novamente",
            secondButtonText: "Cadastrar",
            firstButtonAction: () => setModalContent(null),
            secondButtonAction: () => {
                navigation.navigate("Register")
                setModalContent(null)
            }
        })

        setIsLoading(false)

        return false
    }

    return true
}