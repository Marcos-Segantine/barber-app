export const clearSchedule = (shedulesUser, setShedulesUser) => {
    for (const data in shedulesUser) {
        shedulesUser[data] = null
    }
    setShedulesUser(shedulesUser)
}