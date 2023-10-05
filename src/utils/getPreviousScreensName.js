import { handleError } from "../handlers/handleError"

export const getPreviousScreensName = (navigation) => {
    try {

        const screensState = navigation.getState()

        const screensNames = []

        screensState.routes.forEach(route => {
            screensNames.push(route.name)
        })

        const previousScreen = screensNames[screensNames.length - 2]
        const lastScreen = screensNames[screensNames.length - 1]

        return [previousScreen, lastScreen]
    } catch ({ message }) {
        handleError("getPreviousScreensName", message)
    }
}
