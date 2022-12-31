import { createContext, useEffect, useState } from "react";

import auth from '@react-native-firebase/auth';

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState({})

    return(
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}