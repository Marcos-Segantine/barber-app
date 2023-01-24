import {createContext, useEffect, useState} from 'react';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export const UserVerified = createContext(null);

export const UserVerifiedProvider = ({children}) => {
  const [userVerified, setUserVerified] = useState(true);

  // useEffect(() => {
  //   console.log(
  //     firebase.auth().currentUser?.emailVerified,
  //     'CONTECt USER VERFIED',
  //   );
  //   if (firebase.auth().currentUser?.emailVerified === true) {
  //     setUserVerified(true);
  //   }
  // }, [firebase.auth().currentUser]);

  auth().onAuthStateChanged(res => {
    console.log(res);
    console.log("CONTEXT USERVERIFIED");
  });

  return (
    <UserVerified.Provider value={{userVerified, setUserVerified}}>
      {children}
    </UserVerified.Provider>
  );
};
