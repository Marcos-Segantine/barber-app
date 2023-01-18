import { useContext } from "react";
import { ShedulesUserContext } from "../context/ShedulesUser";

export const getHour = (shedulesUser) => {
    const hour = shedulesUser?.shedule;
    
    return hour !== undefined ? hour : null
}
