/**
 * Creates a new user with the provided information.
 * 
 * @param {object} informationNewUser - The information of the new user.
 * @param {string} password - The password of the new user.
 * @param {object} navigation - The navigation object used for screen navigation.
 * @param {function} setIsLoading - The function to set the loading state.
 * @param {function} setModalInfo - The function to set the modal information.
 * @param {function} setSomethingWrong - The function to set the something wrong state.
 */

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { generateNewUid } from '../../utils/generateNewUid';
import { capitalizeName } from '../../utils/capitalizeName';

import { AccountCreated } from '../../assets/imgs/AccountCreated';

import { handleError } from '../../handlers/handleError';

export const createUserWithEmailAndPassword = async (
  informationNewUser,
  password,
  navigation,
  setIsLoading,
  setModalInfo,
  setSomethingWrong
) => {

  try {

    setIsLoading(true)

    try {

      await auth().createUserWithEmailAndPassword(informationNewUser.email, password).then((res) => {
        res.user.sendEmailVerification()
      })

    } catch ({ message }) {

      // If this error ocurred means that the user create your account using media(Google, Facebook or Apple)
      // So just update the password, to link the Media provider with the EmailAndPassword provider in the Firebase Auth
      if (message === "[auth/email-already-in-use] The email address is already in use by another account.") {
        auth().currentUser.updatePassword(password)

      } else {
        setIsLoading(false)
        setSomethingWrong(true)
      }
    }

    const uid = generateNewUid(setSomethingWrong)

    // Upload profile picture if provided
    if (informationNewUser.profilePicture) {
      const reference = storage().ref("clients/profilePictures/" + uid);
      await reference.putString(informationNewUser.profilePicture, 'base64')

    }

    const url = informationNewUser.profilePicture ? await storage().ref("clients/profilePictures/" + uid).getDownloadURL() : null

    // Set schedules filed in the database for the user
    const scheduleDoc = firestore().collection('schedules_by_user').doc(uid);
    scheduleDoc.set({ schedules: [] })

    const userDoc = firestore().collection('users').doc(uid);

    userDoc.set({
      name: capitalizeName(informationNewUser.name),
      email: informationNewUser.email,
      password: password,
      phone: informationNewUser.phone,
      gender: informationNewUser.gender,
      profilePicture: url,
      uid: uid,
    })

    AsyncStorage.setItem('@barber_app__email', informationNewUser.email)

    setIsLoading(false)

    setModalInfo({
      image: <AccountCreated />,
      mainMessage: "Parabéns",
      message: "Sua conta foi criada com sucesso, agora é só ir para a tela de autenticação e realizar o login",
      firstButtonText: "Ir agora",
      firstButtonAction: () => {
        navigation.navigate("Login", { emailNewUser: informationNewUser.email, passwordNewUser: password })
        setModalInfo(null)
      },
    })

  } catch ({ message }) {
    setIsLoading(false)
    setSomethingWrong(true)
    handleError("createUserWithEmailAndPassword", message)
  }
}
