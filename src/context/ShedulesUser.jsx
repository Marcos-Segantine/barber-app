import { createContext, useContext, useEffect, useState } from "react";

import { UserContext } from "./UserContext";

export const ShedulesUserContext = createContext(null);

export const ShedulesUserProvider = ({ children }) => {
  const { userData } = useContext(UserContext);

  const [shedulesUser, setShedulesUser] = useState();

  useEffect(() => {
    userData ? setShedulesUser({ ...userData }) : null;
  }, [userData]);

  return (
    <ShedulesUserContext.Provider value={{ shedulesUser, setShedulesUser }}>
      {children}
    </ShedulesUserContext.Provider>
  );
};
