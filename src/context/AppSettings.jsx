import { createContext } from "react";

export const AppSettingsContext = createContext(null);

export const AppSettingsProvider = ({ children }) => {

    const settings = {
        minimalHoursToCancelSchedule: 4,
        companyName: "Barbearia nome",
        city: "Nova Ponte",
        address: "Alameda dos Pinheiros, 100",
        neighborhood: "Nome do Bairo",
        limitEditInformationPerMonth: 4,
        blockedWeekdays: ["0"]
    };

    return (
        <AppSettingsContext.Provider value={{ settings: settings }}>
            {children}
        </AppSettingsContext.Provider>
    );
}