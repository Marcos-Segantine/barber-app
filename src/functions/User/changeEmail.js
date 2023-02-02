import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

export const changeEmail = email => {
  const user = firebase.auth().currentUser;

  firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then(({_data}) => {
      firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          ..._data,
          email: email,
        });
    });
};
