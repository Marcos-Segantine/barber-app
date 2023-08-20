/**
 * Sends a password reset email to the user.
 * If the user's email is provided, the email will be sent to that address.
 * If the user's phone number is provided, the email will be sent to the email associated with that phone number.
 * Displays a success modal with a message and a button to navigate to the login screen.
 * Sets a flag to indicate if something went wrong during the process.
 * 
 * @param {string} email - The user's email address.
 * @param {string} phone - The user's phone number.
 * @param {function} setModalInfo - Function to set the modal info.
 * @param {function} setSomethingWrong - Function to set the something wrong flag.
 * @param {object} navigation - The navigation object.
 */

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

        // Send password reset email if email is provided
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

        // Send password reset email if phone number is provided
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