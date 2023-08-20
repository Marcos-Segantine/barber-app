/**
 * Component that provides a schedule context to its children.
 * 
 * @param {ReactNode} children - The child components.
 * @returns {ReactNode} - The rendered component.
 */

import { createContext, useState } from "react"

export const ScheduleContext = createContext(null)

export const ScheduleProvider = ({ children }) => {
    const [schedule, setSchedule] = useState({})

    // Render the children components with the schedule context
    return (
        <ScheduleContext.Provider value={{ schedule, setSchedule }}>
            {children}
        </ScheduleContext.Provider>
    )
}
