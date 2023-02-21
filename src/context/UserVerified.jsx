import {createContext, useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';

export const UserVerified = createContext(null);

export const UserVerifiedProvider = ({children}) => {
  const [userVerified, setUserVerified] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    
    if (user?.emailVerified) setUserVerified(true);
    else setUserVerified(false);
  }, []);

  return (
    <UserVerified.Provider value={{userVerified, setUserVerified}}>
      {children}
    </UserVerified.Provider>
  );
};
