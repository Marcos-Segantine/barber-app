import { useContext } from "react";
import { ShedulesUserContext } from "../context/ShedulesUser";

export const getMonth = (shedulesUser) => {
    const month = shedulesUser?.day?.split("").slice(5, 7).join("");
    
    return month !== undefined ? month : null
}