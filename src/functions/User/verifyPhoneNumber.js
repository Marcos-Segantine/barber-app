import auth from '@react-native-firebase/auth';

export const verifyPhoneNumber = async (phoneNumber, setConfirm) => {
  const confirmation = await auth().verifyPhoneNumber(phoneNumber);
  setConfirm(confirmation);
};
