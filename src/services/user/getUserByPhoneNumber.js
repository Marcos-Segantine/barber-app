import firestore from '@react-native-firebase/firestore';

export const getUserByPhoneNumber = async (phone) => {
  const usersRef = firestore().collection("users").where("phone", "==", phone);
  const userData = (await usersRef.get()).docs

  if (!userData.length) return null

  return userData[0].data()
}