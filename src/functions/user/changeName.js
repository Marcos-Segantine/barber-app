import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

export const changeName = async (name, userData, setUserData) => {
  const user = firebase.auth().currentUser;

  try {
    await user.updateProfile({
      displayName: name,
    });

    const userRef = firestore().collection('users').doc(user.uid);
    const doc = await userRef.get();
    const userData = doc.data();

    await userRef.update({
      ...userData,
      name: name,
    });

    setUserData({
      ...userData,
      name: name,
    });
  } catch (error) {
    console.log(error);
  }
};
