import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUserWithEmailAndPassword = (
  email,
  password,
  comfirmPassword,
  phone,
  name,
  canUserContinue,
  setMessageError,
  setModalVisible,
  setModalMessageEmailVerification,
  navigation
) => {
  if (!email || !password || !comfirmPassword || !phone || !name) {
    setModalVisible(true);
    setMessageError('Por favor preencha todos os campos');

    return;
  } else if (password !== comfirmPassword) {
    setModalVisible(true);
    setMessageError('Senhas não são iguais');

    return;
  }

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async res => {
      firestore().collection('users').doc(res.user.uid).set({
        name: name,
        email: email,
        password: password,
        phone: phone,
        uid: res.user.uid,
      });

      firestore().collection('schedules_by_user').doc(res.user.uid).set({
        schedules: [],
      });

      await AsyncStorage.setItem('@barber_app__email', email);
      await AsyncStorage.setItem('@barber_app__password', password);

      const user = auth().currentUser;

      user
        .sendEmailVerification()
        .then(() => {
          console.log('Email de verificação enviado!');
          setModalMessageEmailVerification(true);
        })
        .catch(error => {
          console.log(error);
          setModalMessageEmailVerification(false);
        });

      canUserContinue ? navigation.navigate('Services') : null;
    })
    .catch(err => {
      console.log(err.message);
      setModalVisible(true);

      switch (err.message) {
        case '[auth/invalid-email] The email address is badly formatted.':
          setMessageError('Email inválido');
          break;

        case '[auth/email-already-in-use] The email address is already in use by another account.':
          setMessageError('Email já está em uso');
          break;

        default:
          setMessageError('Ocorreu um erro');
          break;
      }
    });
};
