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
  try {
    GoogleSignin.configure({
      webClientId:
        '10724457964-o7b9idafundq6uhu1ls8upa5c53013gs.apps.googleusercontent.com',
    });

    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const res = await auth().signInWithCredential(googleCredential);

    await firestore().runTransaction(async transaction => {
      await transaction.set(firestore().collection('users').doc(res.user.uid), {
        name: res.user.displayName,
        email: res.user.email,
        password: null,
        phone: res.user.phoneNumber,
        uid: res.user.uid,
      });

      setUserData({
        name: res.user.displayName,
        email: res.user.email,
        password: null,
        phone: res.user.phoneNumber,
        uid: res.user.uid,
      });

      await AsyncStorage.setItem('@barber_app__email', res.user?.email);

      await transaction.set(
        firestore().collection('schedules_by_user').doc(res.user.uid),
        {
          schedules: [],
        },
      );
    });

    if (res.additionalUserInfo.isNewUser) {
      await firebase.auth().sendPasswordResetEmail(res.user.email);

      setModalVisible(true);
      setUserVerified(true);
    } else {
      navigation.navigate('Services');
    }
  } catch (error) {
    console.log(error);
  }
};
