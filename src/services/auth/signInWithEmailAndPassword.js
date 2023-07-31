import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { findErrorAuth } from './findErrorAuth';

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

    if (!await findErrorAuth(
      email,
      password,
      setSomethingWrong,
      setIsLoading,
      setModalContent,
      navigation)) return

    const usersRef = firestore().collection("users").where("email", "==", email);
    const userDataCollection = (await usersRef.get()).docs.length ? (await usersRef.get()).docs[0].data() : null

    if (userDataCollection && userDataCollection?.password === password && userDataCollection?.email === email) {
      await auth().signInWithEmailAndPassword(email, password)
        .then(async () => {
          if (!auth().currentUser.emailVerified) {
            setModalContent({
              firstButtonMessage: "Email não verificado",
              description: "Verifique seu email e clique em 'Reenviar'. Verifique sua caixa de spam se não o encontrar.",
              firstButtonMessage: "Tentar Novamente",
              secondButtonMessage: "Reenviar",
              firstButtonAction: () => setModalContent(null),
              secondButtonAction: () => {
                auth().currentUser.sendEmailVerification()
                setModalContent(null)
              }
            })

            setIsLoading(false)

            return
          }

          await AsyncStorage.setItem('@barber_app__email', email);
          await AsyncStorage.setItem('@barber_app__password', password);

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

            await AsyncStorage.setItem('@barber_app__email', email);
            await AsyncStorage.setItem('@barber_app__password', password);

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

  } catch (err) {
    console.error(err);
    setSomethingWrong(true)
  }
}