import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUserByGoogle = async (
  navigation,
  setModalVisible,
  setUserData,
) => {
  try {
    GoogleSignin.configure({
      webClientId:
        '10724457964-o7b9idafundq6uhu1ls8upa5c53013gs.apps.googleusercontent.com',
    });

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // login with Google
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // create firebase's user
    const { user } = await auth().signInWithCredential(googleCredential);

    const usersRef = firestore().collection('users').doc(user.uid)
    const schedulesByUserRef = firestore().collection('schedules_by_user').doc(user.uid)

    const batch = firestore().batch();

    // data to create a user in firestore
    const userData = {
      email: user.email,
      name: user.displayName,
      password: null,
      phone: user.phoneNumber,
      uid: user.uid,
    };

    batch.set(usersRef, userData);
    batch.set(schedulesByUserRef, {
      schedules: [],
    });

    await batch.commit();

    await Promise.all([
      AsyncStorage.setItem('@barber_app__email', user.email),
      firebase.auth().sendPasswordResetEmail(user.email),
    ]);

    if (user.additionalUserInfo.isNewUser) {
      setModalVisible(true);
      setUserVerified(true);
    } else {
      navigation.navigate('Services');
    }

    setUserData(userData);
    console.log('User created by Google:', user);
  } catch (error) {
    console.error(
      'Error occurred while creating a new user with Google account:',
      error,
    );
  }
};
