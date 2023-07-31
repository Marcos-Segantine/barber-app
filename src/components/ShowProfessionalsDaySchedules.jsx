import { useContext, useEffect } from "react"

import { Professionals } from "./Professionals"
import { CalendarComponent } from "./CalendarComponent"
import { Schedules } from "./Schedules"

import { ScheduleContext } from "../context/ScheduleContext"

export const ShowProfessionalsDaySchedules = ({ preferProfessional, setCanScrollToEnd }) => {
    const { schedule } = useContext(ScheduleContext)

    useEffect(() => {
        if (schedule.professional || schedule.day || schedule.schedule) setCanScrollToEnd(true)

    }, [schedule.professional, schedule.day, schedule.schedule])

    return (
        preferProfessional ?
            (
                <>
                    <Professionals preferProfessional={preferProfessional} />
                    {schedule.professional && <CalendarComponent />}
                    {schedule.day && schedule.professional && <Schedules preferProfessional={preferProfessional} />}
                </>
            ) :
            (
                <>
                    <Schedules preferProfessional={preferProfessional} />
                    {schedule.schedule && <CalendarComponent />}
                    {schedule.day && schedule.schedule && <Professionals preferProfessional={preferProfessional} />}
                </>
            )
    )
}