import {createContext, useEffect, useState} from 'react';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export const UserVerified = createContext(null);

export const UserVerifiedProvider = ({children}) => {
  const [userVerified, setUserVerified] = useState(true);

  return (
    <UserVerified.Provider value={{userVerified, setUserVerified}}>
      {children}
    </UserVerified.Provider>
  );
};
