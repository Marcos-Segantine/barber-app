import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInWithEmailAndPassword = async (
  navigation,
  email,
  password,
  setUserData,
  setModalVisible,
  setMessageError,
) => {
  try {
    if (!email.trim() || !password.trim()) {
      setMessageError('Por favor preencha todos os campos'),
        setModalVisible(true);

      return;
    }

    const res = await auth().signInWithEmailAndPassword(email, password);

    await AsyncStorage.setItem('@barber_app__email', email);
    await AsyncStorage.setItem('@barber_app__password', password);

    const userQuery = await firestore()
      .collection('users')
      .where('uid', '==', res.user.uid)
      .get();

    const [userData] = userQuery.docs.map(doc => doc.data());

    setUserData(userData);

    const user = firebase.auth().currentUser;

    if (!user?.emailVerified) {
      setModalVisible(true);
      setMessageError('Email não verificado');

      return;
    }

    navigation.navigate('Services');
  } catch (err) {
    setModalVisible(true);
    console.log(err, '<<<<<<<<<<<<<<<<<<<<<<<');

    switch (err.message) {
      case '[auth/invalid-email] The email address is badly formatted.':
        setMessageError('Email inválido');
        break;
      case '[auth/wrong-password] The password is invalid or the user does not have a password.':
        setMessageError('Senha inválida');
        break;

      case '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.':
        setMessageError('Usuário não encontrado');
        break;

      default:
        setMessageError('Email e/ou senha inválidos');
        break;
    }
  }
};
