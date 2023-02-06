import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const changePhoneNumber = async (
  confirm,
  code,
  setError,
  setMessageError,
  phone,
  userData,
  setUserData,
) => {
  try {
    const credential = auth.PhoneAuthProvider.credential(
      confirm.verificationId,
      code,
    );
    let user = await auth().currentUser.linkWithCredential(credential);
    firestore()
      .collection('users')
      .doc(user.user.uid)
      .get()
      .then(({_data}) => {
        firestore()
          .collection('users')
          .doc(user.user.uid)
          .update({..._data, phone: phone})
          .then(() => {
            setUserData({
              ...userData,
              phone: phone,
            });

          });
      });
  } catch (error) {
    if (error.code == 'auth/invalid-verification-code') {
      console.log(error);
      setError(true);
      setMessageError('Código invalido');
    } else if (
      error.message ===
      '[auth/unknown] User has already been linked to the given provider.'
    ) {
      console.log(error);
      setError(true);
      setMessageError(
        'Verificamos que este número de telefone já está em uso.',
      );
    } else {
      console.log(error);
      setError(true);
      setMessageError('Ocorreu um erro, por favor tente mais tarde.');
    }
  }
};
