import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const changePhoneNumber = async (
  confirm,
  code,
  setError,
  phone,
  userData,
) => {
  if (!code) {
    setError(true);
    return;
  }

  try {
    const credential = auth.PhoneAuthProvider.credential(
      confirm.verificationId,
      code,
    );
    const user = await auth().currentUser.linkWithCredential(credential);

    const userRef = firestore().collection('users').doc(user.user.uid);
    const batch = firestore().batch();

    batch.update(userRef, {phone});
    batch.update(userRef, {...userData, phone});

    await batch.commit();
    setError(false);
  } catch (error) {
    if (error.code === 'auth/invalid-verification-code') {
      setError(true);
      throw Error('Código inválido');
    } else if (
      error.code === 'auth/provider-already-linked' ||
      error.code === 'auth/email-already-in-use'
    ) {
      // Expected errors
      setError(true);
    } else {
      // Unexpected errors
      console.log(error);
      throw error;
    }
  }
};
