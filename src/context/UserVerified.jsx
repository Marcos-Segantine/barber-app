import {createContext, useEffect, useState} from 'react';

import firebase from '@react-native-firebase/app';

export const UserVerified = createContext(null);

export const UserVerifiedProvider = ({children}) => {
  const [userVerified, setUserVerified] = useState(false);

  useEffect(() => {
    console.log(
      firebase.auth().currentUser.emailVerified,
      'CONTECt USER VERFIED',
    );
    if (firebase.auth().currentUser.emailVerified === true) {
      setUserVerified(true);
    }
  }, [firebase.auth().currentUser]);

  return (
    <UserVerified.Provider value={{userVerified, setUserVerified}}>
      {children}
    </UserVerified.Provider>
  );
};
