import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInWithGoogle = async (navigation, setSomethingWrong, setIsLoading) => {
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

    if (res.additionalUserInfo.isNewUser || userData === 0) {

      navigation.navigate('CreateNewPassword', { newAccountByMedia: true, mediaEmail: res.user.email });

    } else navigation.navigate('Home');

  } catch (error) {

    if (error.message === "Sign in action cancelled") {
      setIsLoading(false)
      return

    } else {

      console.error(error);
      setSomethingWrong(true)
    }
  }
};
