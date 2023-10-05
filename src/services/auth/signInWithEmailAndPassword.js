/**
 * Sign in with email and password.
 * 
 * @param {object} navigation - The navigation object to navigate to other screens.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {function} setModalContent - The function to set the content of a modal.
 * @param {function} setUserData - The function to set the user data.
 * @param {function} setEmail - The function to set the email input value.
 * @param {function} setPassword - The function to set the password input value.
 * @param {function} setSomethingWrong - The function to set the somethingWrong state.
 * @param {function} setIsLoading - The function to set the isLoading state.
 */

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { findErrorAuth } from './findErrorAuth';

import { StopProcessError } from '../../assets/imgs/StopProcessError';

import { handleError } from '../../handlers/handleError';

export const signInWithEmailAndPassword = async (
  navigation,
  email,
  password,
  setModalContent,
  setUserData,
  setEmail,
  setPassword,
  setSomethingWrong,
  setIsLoading,
) => {
  try {

    // Check for errors in authentication, if there are errors the function will stop the process
    if (!await findErrorAuth(
      email,
      password,
      setSomethingWrong,
      setIsLoading,
      setModalContent,
      navigation)) return

    // Get the user data using the email provided
    const usersRef = firestore().collection("users").where("email", "==", email);
    const userDataCollection = (await usersRef.get()).docs.length ? (await usersRef.get()).docs[0].data() : null

    // Check if user data exists and matches the input email and password
    if (userDataCollection && userDataCollection?.password === password && userDataCollection?.email === email) {
      await auth().signInWithEmailAndPassword(email, password)
        .then(async () => {

          // Check if user's email is verified
          if (!auth().currentUser.emailVerified) {
            setModalContent({
              image: <StopProcessError />,
              mainMessage: "Email não verificado",
              message: `Enviamos um email para ${email}, verifique sua caixa de spam se não o encontrar ou clique em "Reenviar".`,
              firstButtonText: "Email não verificado",
              description: "Verifique seu email e clique em 'Reenviar'. Verifique sua caixa de spam se não o encontrar.",
              firstButtonText: "Tentar Novamente",
              secondButtonText: "Reenviar",
              firstButtonAction: () => setModalContent(null),
              secondButtonAction: () => {

                // Resend verification email
                auth().currentUser.sendEmailVerification()
                setModalContent(null)
              }
            })

            setIsLoading(false)

            return
          }

          // Set email and password in AsyncStorage for auto-login
          await AsyncStorage.setItem('@barber_app__email', email);
          await AsyncStorage.setItem('@barber_app__password', password);

          // Set user data and navigate to Home screen
          setUserData(userDataCollection);
          navigation.navigate('Home');

          setEmail("")
          setPassword("")
          setIsLoading(false)

        })
        .catch(async (error) => {
          console.log(error.message);
          if (
            error.message ===
            "[auth/wrong-password] The password is invalid or the user does not have a password." ||
            error.message ===
            "[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted."
          ) {
            await auth().createUserWithEmailAndPassword(email, password)
            await auth().signInWithEmailAndPassword(email, password)

            // Set email and password in AsyncStorage for auto-login
            await AsyncStorage.setItem('@barber_app__email', email);
            await AsyncStorage.setItem('@barber_app__password', password);

            // Set user data and navigate to Home screen
            setUserData(userDataCollection);
            navigation.navigate('Home');

            setEmail("")
            setPassword("")
            setIsLoading(false)
          }
          else throw Error("User not found")
        })

    } else {
      throw Error("User not found")
    }

  } catch ({ message }) {
    setSomethingWrong(true)
    handleError("signInWithEmailAndPassword", message)
  }
}