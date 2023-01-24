import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const signInWithEmailAndPassword = (
  navigation,
  email,
  password,
  setUserData,
  setModalVisible,
  setMessageError,
) => {
  if (!email.trim() || !password.trim()) {
    setMessageError('Por favor preencha todos os campos'),
      setModalVisible(true);

    return;
  }

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(async res => {
      await AsyncStorage.setItem('@barber_app__email', email);
      await AsyncStorage.setItem('@barber_app__password', password);

      firestore()
        .collection('users')
        .where('uid', '==', res.user.uid)
        .get()
        .then(res => {
          setUserData(res._docs[0]?._data);
        });

      const user = firebase.auth().currentUser;

      if (!user?.emailVerified) {
        setModalVisible(true);
        setMessageError('Email não verificado');

        // setIsToClearEmailAndPassword(false);

        return;
      }

      navigation.navigate('Services');
    })
    .catch(err => {
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
    });
};
