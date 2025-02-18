/**
 * Retrieves user data based on their phone number.
 * 
 * @param {string} phone - The phone number of the user.
 * @returns {Object|null} - The user data if found, or null if not found.
 */

import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

type GetUserByPhoneNumber = (phone: string, setSomethingWrong: (value: boolean) => void) => Promise<Object | null>

export const getUserByPhoneNumber: GetUserByPhoneNumber = async (phone, setSomethingWrong) => {
  try {

    const usersRef = firestore().collection("users").where("phone", "==", phone);
    const userData = (await usersRef.get()).docs

    // If no user data is found, return null
    if (!userData.length) return null

    // Every user has a unique phone number, so is safe return the first user from `userData`
    return userData[0].data()

  } catch (error: any) {
    setSomethingWrong(true)
    handleError("getUserByPhoneNumber", error.message)
    return null
  }
}
