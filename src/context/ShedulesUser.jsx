import { createContext, useState } from "react";

const ShedulesUserContext = createContext(null)

export const ShedulesUserProvider = ({ children }) => {
    const [ shedulesUser, setShedulesUser ] = useState(null)
    
    return(
        <ShedulesUserContext.Provider value={{ shedulesUser, setShedulesUser }}>
            { children }
        </ShedulesUserContext.Provider>
    )
}