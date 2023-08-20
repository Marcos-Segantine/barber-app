/**
 * Component that provides the selected menu item to its children.
 * 
 * @param {ReactNode} children - The children components.
 * @returns {ReactNode} - The rendered component.
 */

import { createContext, useState } from "react";

export const MenuItemContext = createContext(null)

export const MenuItemProvider = ({ children }) => {
    const [itemSelected, setItemSelected] = useState("home")

    // Render the children components with the selected menu item context
    return (
        <MenuItemContext.Provider value={{ itemSelected, setItemSelected }}>
            {children}
        </MenuItemContext.Provider>
    )
}
