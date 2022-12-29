import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext({});

export function AuthProvider({ data }) {
    const [user, setUser] = useState();

    useEffect(() => {
        auth().onUserChanged(user => {
            setUser(user)
        })
    }, [ user ])

    return (
        <AuthContext.Provider value={{ user }}>
            {data}
        </AuthContext.Provider>
    )
}
