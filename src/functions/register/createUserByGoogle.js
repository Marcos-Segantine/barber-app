import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUserByGoogle = async (
  navigation,
  setModalVisible,
  setUserData,
) => {
  try {
    // Configura o Google Signin e verifica se o Play Services estão disponíveis
    await GoogleSignin.configure({
      webClientId:
        '10724457964-o7b9idafundq6uhu1ls8upa5c53013gs.apps.googleusercontent.com',
    });

    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    // Faz o login com o Google
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Cria o usuário no Firebase Auth
    const {user} = await auth().signInWithCredential(googleCredential);

    // Cria o usuário no Firestore
    const userData = {
      email: user.email,
      name: user.displayName,
      password: null,
      phone: user.phoneNumber,
      uid: user.uid,
    };

    const batch = firestore().batch();
    batch.set(firestore().collection('users').doc(user.uid), userData);
    batch.set(firestore().collection('schedules_by_user').doc(user.uid), {
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
