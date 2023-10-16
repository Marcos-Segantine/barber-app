/**
 * Sign in with Google
 * 
 * @param {Object} navigation - navigation object for navigating between screens
 * @param {Function} setSomethingWrong - function to set error flag if something goes wrong
 * @param {Function} setIsLoading - function to set loading flag during sign in process
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { handleError } from '../../handlers/handleError';

export const signInWithGoogle = async (
  navigation,
  setSomethingWrong,
  setIsLoading
) => {
  try {
    setIsLoading(true)

    GoogleSignin.configure({
      webClientId:
        '923108786140-roh5hmn9354f2addcolem93pmmfeibv7.apps.googleusercontent.com',
    });

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const res = await auth().signInWithCredential(googleCredential);

    await AsyncStorage.setItem('@barber_app__email', res.user.email);

    const usersRef = firestore().collection('users').where("email", "==", res.user.email);
    const userData = (await usersRef.get()).docs.length

    setIsLoading(false)

    // Navigate to CreateNewPassword screen if it's a new user
    if (res.additionalUserInfo.isNewUser || userData === 0) {

      navigation.navigate('CreateNewPassword', { newAccountByMedia: true, mediaEmail: res.user.email });

      // Navigate to Home screen if it's an existing user
    } else navigation.navigate('Home');

  } catch ({ message }) {

    if (message === "Sign in action cancelled") {
      setIsLoading(false)
      return

    } else {
      setSomethingWrong(true)
      handleError("signInWithGoogle", message)
    }
  }
};
