import {GoogleSignin} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInWithGoogle = async (
  navigation,
  setUserVerified,
  setUserData,
  setModalVisible,
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
    .then(async res => {
      console.log('Login by google');

      firestore()
        .collection('users')
        .doc(res.user.uid)
        .set({
          name: res.user.displayName,
          email: res.user.email,
          password: null,
          phone: res.user.phoneNumber,
          uid: res.user.uid,
        })
        .then(async () => {
          console.log('users colection updated!');
          setUserData({
            name: res.user.displayName,
            email: res.user.email,
            password: null,
            phone: res.user.phoneNumber,
            uid: res.user.uid,
          });

          await AsyncStorage.setItem('@barber_app__email', res.user?.email);

          firestore()
            .collection('schedules_by_user')
            .doc(res.user.uid)
            .set({
              schedules: [],
            })
            .then(() => {
              if (res.additionalUserInfo.isNewUser) {
                firebase
                  .auth()
                  .sendPasswordResetEmail(res.user.email)
                  .then(async () => {
                    console.log(
                      'EMIAL TO REDEFINITION OF PASSWORD SEND SUCESSFULLY',
                    );
                    setModalVisible(true);
                    setUserVerified(true);
                  })
                  .catch(err => {
                    console.log(err);
                    console.log('ERROR RO SEND A EMAIL TO CHANGE PASSWORD');
                  });
              } else navigation.navigate('Services');
            });
        });
    });
};
