import auth from '@react-native-firebase/auth';

export const verifyIfHavePhoneNumber = async setModalPhoneVerification => {
  const {phoneNumber} = auth().currentUser;

  if (!phoneNumber) {
    setModalPhoneVerification(true);
    return false;
  }
  return true;
};
