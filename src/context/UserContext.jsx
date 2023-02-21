import {createContext, useEffect, useState, useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleAuthStateChanged = res => {
    setUser(res);
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(handleAuthStateChanged);

    return unsubscribe;
  }, []);

  const updateUserData = useCallback(
    data => {
      if (user && userData) {
        firestore()
          .collection('users')
          .doc(user.uid)
          .update({...userData, ...data})
          .then(() => {
            setUserData(prevData => ({...prevData, ...data}));
          })
          .catch(err => {
            console.log(err, user, 'Context');
          });
      }
    },
    [user, userData],
  );

  useEffect(() => {
    if (user) {
      firestore()
        .collection('users')
        .where('uid', '==', user.uid)
        .get()
        .then(({_docs}) => {
          setUserData(_docs[0]?._data);
        });
    } else {
      setUserData(null);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{userData, setUserData: updateUserData}}>
      {children}
    </UserContext.Provider>
  );
};
