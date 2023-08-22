/**
 * Retrieves user data based on their phone number.
 * 
 * @param {string} phone - The phone number of the user.
 * @returns {Object|null} - The user data if found, or null if not found.
 */

import firestore from '@react-native-firebase/firestore';

export const getUserByPhoneNumber = async (phone) => {
  const usersRef = firestore().collection("users").where("phone", "==", phone);
  const userData = (await usersRef.get()).docs

  // If no user data is found, return null
  if (!userData.length) return null

  // Every user has a unique phone number, so is safe return the first user from `userData`
  return userData[0].data()
}
