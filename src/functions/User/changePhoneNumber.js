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
  if (!code) {
    setError(true);
    setMessageError({
      type: 'phone',
      message: 'Insira o código',
    });

    return;
  }
  try {
    const credential = auth.PhoneAuthProvider.credential(
      confirm.verificationId,
      code,
    );
    const user = await auth().currentUser.linkWithCredential(credential);

    const {_data} = await firestore()
      .collection('users')
      .doc(user.user.uid)
      .get();

    const updateProfile = firestore()
      .collection('users')
      .doc(user.user.uid)
      .update({..._data, phone: phone});

    const updateUser = setUserData({...userData, phone: phone});
    setError(false);

    await Promise.all([updateProfile, updateUser]);
  } catch (error) {
    if (error.code == 'auth/invalid-verification-code') {
      console.log(error);
      setError(true);
      setMessageError({
        type: 'phone',
        message: 'Código inválido',
      });
    } else if (
      error.message ===
      '[auth/unknown] User has already been linked to the given provider.'
    ) {
      console.log(error);
      setError(true);
      setMessageError({
        type: 'phone',
        message: 'Verificamos que este número de telefone já está em uso.',
      });
    } else {
      console.log(error);
      setError(true);
      setMessageError({
        type: 'phone',
        message: 'Ocorreu um erro, por favor tente mais tarde.',
      });
    }
  }
};
