import { createContext, useEffect, useState } from "react";

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ userData, setUserData ] = useState(null)

    auth().onAuthStateChanged(res => {
        res ? 
        setUser(res.uid)
        : 
        console.log('USER LOG OUT');
    })

    useEffect(() => {
        user ?
        (
            firestore()
                .collection('users')
                .where('uid', '==', user)
                .get()
                .then(res => {
                    setUserData(res._docs[0]._data)
                })
        )
        :
        setUserData(null)

        console.log(userData, 'CONTEXT');
    }, [ user ])

    return(
        <UserContext.Provider value={{ userData, setUserData }}>
            { children }
        </UserContext.Provider>
    )
}