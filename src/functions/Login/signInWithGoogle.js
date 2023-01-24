import {GoogleSignin} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInWithGoogle = async (
  navigation,
  setUserVerified,
  setUserData,
) => {
  GoogleSignin.configure({
    webClientId:
      '10724457964-o7b9idafundq6uhu1ls8upa5c53013gs.apps.googleusercontent.com',
  });

  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  const {idToken} = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  auth()
    .signInWithCredential(googleCredential)
    .then(res => {
      console.log('Login by google');

      firestore()
        .collection('users')
        .doc(res.user.uid)
        .get()
        .then(async ({_data}) => {
          console.log(_data, '_data');
          setUserData({..._data});

          await AsyncStorage.setItem('@barber_app__email', _data?.email);
        });

      setUserVerified(true);

      navigation.navigate('Services');
    })
    .catch(error => {
      console.log(
        error,
        'ERROR OCURRED WHEN TRY TO CREATE A NEW USER WITH GOOGLE ACCOUNT!!',
      );
    });
};
