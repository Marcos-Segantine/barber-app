import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUserWithEmailAndPassword = async (
  email,
  password,
  comfirmPassword,
  phone,
  name,
  setMessageError,
  setModalVisible,
  setModalMessageEmailVerification,
) => {
  const isFieldsValid =
    email &&
    password &&
    comfirmPassword &&
    phone &&
    name &&
    password === comfirmPassword;

  if (!isFieldsValid) {
    setModalVisible(true);
    setMessageError('Por favor preencha todos os campos');

    return;
  }

  try {
    const res = await auth().createUserWithEmailAndPassword(email, password);
    const uid = res.user.uid;
    const userDoc = firestore().collection('users').doc(uid);
    const scheduleDoc = firestore().collection('schedules_by_user').doc(uid);

    const batch = firestore().batch();

    batch.set(userDoc, {
      name: name,
      email: email,
      password: password,
      phone: phone,
      uid: uid,
    });
    batch.set(scheduleDoc, {
      schedules: [],
    });
    await batch.commit();

    await AsyncStorage.setItem('@barber_app__email', email);
    await AsyncStorage.setItem('@barber_app__password', password);

    await res.user.sendEmailVerification();
    setModalMessageEmailVerification(true);

  } catch (error) {
    setModalVisible(true);
    switch (error.code) {
      case 'auth/invalid-email':
        setMessageError('Email inválido');
        break;
      case 'auth/email-already-in-use':
        setMessageError('Email já está em uso');
        break;
      default:
        setMessageError('Ocorreu um erro');
        break;
    }
  }
};
