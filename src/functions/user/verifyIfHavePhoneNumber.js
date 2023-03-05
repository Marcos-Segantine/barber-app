import auth from '@react-native-firebase/auth';

export const verifyIfHavePhoneNumber = () => {
  const user = auth().currentUser;

  if (!user?.phoneNumber || !user) {
    return false;
  }
  return true;
};
