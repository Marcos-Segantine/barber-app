import { useContext } from "react";
import { ShedulesUserContext } from "../context/ShedulesUser";

export const getProfessional = (shedulesUser) => {
    const professional = shedulesUser?.professional;
    
    return professional !== undefined ? professional : null
}
