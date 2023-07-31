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

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(handleAuthStateChanged);

    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {

      try {
        if (user) {

          const userRef = await firestore().collection("users").where("email", "==", user.email).get()
          if(!userRef.docs.length) return
          
          const userDataCollection = userRef.docs[0].data()

          if (!userDataCollection) return

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

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
