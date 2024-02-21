/**
 * Retrieve user data by email.
 * 
 * @param {string} email - The email of the user.
 * @returns {Object|null} - The user data or null if not found.
 */

import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

type GerUserByEmail = (email: string, setSomethingWrong: (value: boolean) => void) => Promise<Object | null>

export const getUserByEmail: GerUserByEmail = async (email, setSomethingWrong) => {
    try {

        const usersRef = firestore().collection("users").where("email", "==", email);
        const userData = (await usersRef.get()).docs

        // If no user data is found, return null
        if (userData.length === 0) return null
        else return userData[0].data()

    } catch (error: any) {
        setSomethingWrong(true)
        handleError("getUserByEmail", error.message)
        return null;
    }
}