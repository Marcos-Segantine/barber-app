import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

export const changeEmail = (email, setEmail, setError, setMessageError) => {
  const user = firebase.auth().currentUser;

  user.updateEmail(email).then(() => {
    setEmail('');

    firestore()
      .collection()
      .doc(user.uid)
      .get()
      .then(({_data}) => {
        firestore()
          .collection()
          .doc(user.uid)
          .update({..._data, email: email})
          .then(() => {
            console.log('EMAIL CHANGED!!');
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log('ERROR TO CAHNGE EMAIL!!');
        console.log(error);
        setError(true);
        setMessageError('Ocorreu um erro.');
      });
  });
};
