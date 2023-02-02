import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

export const changeName = (name, userData, setUserData) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
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
              name: name,
            })
            .then(() => {
              console.log(_data);
              setUserData({
                ...userData,
                name: name,
              });
            });
        });
    });
};
