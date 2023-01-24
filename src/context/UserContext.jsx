import {createContext, useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  auth().onAuthStateChanged(res => {
    res ? setUser(res.uid) : console.log('USER LOG OUT');
  });

  useEffect(() => {
    console.log('EFFECT USER');
    user
      ? firestore()
          .collection('users')
          .where('uid', '==', user)
          .get()
          .then(({_docs}) => {
            setUserData(_docs[0]?._data);
            console.log('EFECCT USERDATA');
            firestore()
              .collection('users')
              .doc(user)
              .update({...userData})
              .then(() => {
                console.log('DATA UPDATED CONTEXT');
              })
              .catch(err => {
                console.log(err, user, 'Context');
              });
          })
      : setUserData(null);
  }, [user]);

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
};
