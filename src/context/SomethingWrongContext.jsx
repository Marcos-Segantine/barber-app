/**
 * Provides a context for managing the state of something being wrong.
 * 
 * @param {ReactNode} children - The child components.
 * @returns {ReactNode} The rendered component.
 */

import { createContext, useState } from "react";

export const SomethingWrongContext = createContext()

export const SomethingWrongProvider = ({ children }) => {
    const [somethingWrong, setSomethingWrong] = useState(false)

        // Render the children components with the selected something wrong context
    return (
        <SomethingWrongContext.Provider value={{ somethingWrong, setSomethingWrong }}>
            {children}
        </SomethingWrongContext.Provider>
    )
}
