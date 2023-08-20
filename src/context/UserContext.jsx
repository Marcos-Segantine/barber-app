/**
 * UserProvider component provides user data to its children components.
 * It fetches the user data from Firestore based on the user's email.
 * If there is no user data available, it sets the userData state to null.
 *
 * @param {ReactNode} children - The child components to be wrapped by UserProvider.
 * @returns {ReactNode} - The rendered component.
 */

import { createContext, useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleAuthStateChanged = res => {
    setUser(res);
  };

  // Set up the effect to subscribe to the authentication state changes.
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(handleAuthStateChanged);

    // Clean up the effect by unsubscribing from the authentication state changes.
    return unsubscribe;
  }, []);

  // Fetch the user data from Firestore when the user state changes.
  useEffect(() => {
    (async () => {

      try {
        if (user) {

          const userRef = await firestore().collection("users").where("email", "==", user.email).get()
          if (!userRef.docs.length) return

          // Get the user data from the first user document.
          // Each user has their unique email, so it is safe to take the first document.
          const userDataCollection = userRef.docs[0].data()

          // If no user data is available, return early.
          if (!userDataCollection) return

          // Set the userData state with the user data.
          userDataCollection && setUserData(
            {
              name: userDataCollection.name,
              nickname: userDataCollection.nickname,
              email: userDataCollection.email,
              password: userDataCollection.password,
              phone: userDataCollection.phone,
              profilePicture: userDataCollection.profilePicture,
              gender: userDataCollection.gender,
              uid: userDataCollection.uid,
            }
          );
        } else setUserData(null);

      } catch (error) {
        console.log(error);
      }

    })();
  }, [user]);

  // Provide the userData state to the child components via context.
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
