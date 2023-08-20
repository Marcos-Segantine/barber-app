import auth from '@react-native-firebase/auth';

import { getUserByPhoneNumber } from '../user/getUserByPhoneNumber';

import { EmailSendImage } from '../../assets/imgs/EmailSendImage';

export const sendEmailForgotPassword = async (
    email,
    phone,
    setModalInfo,
    setSomethingWrong,
    navigation
) => {
    try {

        if (email) {
            await auth().sendPasswordResetEmail(email)
            setModalInfo({
                image: <EmailSendImage />,
                mainMessage: "Email enviado com sucesso!",
                message: "Acabamos de enviar para o seu email um link para alterar sua senha.",
                firstButtonText: 'Confirmar',
                firstButtonAction: () => {
                    setModalInfo(null)
                    navigation.navigate("Login")
                }
            })
        }
        else if (phone) {
            const userByPhoneNumber = await getUserByPhoneNumber(phone)

            if (phone) await auth().sendPasswordResetEmail(userByPhoneNumber.email)

            setModalInfo({
                image: <EmailSendImage />,
                mainMessage: "Email enviado com sucesso!",
                message: "Acabamos de enviar para o seu email um link para alterar sua senha.",
                firstButtonText: 'Confirmar',
                firstButtonAction: () => {
                    setModalInfo(null)
                    navigation.navigate("Login")
                }
            })
        }
    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}