export const changeEmail = async (email) => {
  const user = firebase.auth().currentUser;

  try {
    await user.updateEmail(email);
    await user.sendEmailVerification();

    const userRef = firestore().collection('users').doc(user.uid);
    const batch = firestore().batch();

    batch.update(userRef, { email: email });
    batch.update(userRef.collection('public').doc('profile'), { email: email });

    await batch.commit();
  } catch (error) {
    console.error('Error changing email:', error);
  }
};
