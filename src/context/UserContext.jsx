import { createContext, useState } from "react";

import auth from '@react-native-firebase/auth'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    auth().onAuthStateChanged(res => {
        res ? 
        setUser(res.uid)
        : 
        console.log('USER LOG OUT');
        
    })

    return(
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}