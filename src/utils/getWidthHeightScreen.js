import { Dimensions } from "react-native"

export const getWidthHeightScreen = (filed, percentage, setSomethingWrong) => {
    try {
        const data = Dimensions.get('screen')

        if (filed && percentage) return (data[filed] - (data[filed] * (+percentage / 100)))
        else if (filed) return data[filed]
        return data
    } catch ({ message }) {
        if (setSomethingWrong) {
            setSomethingWrong(true)
        }
        handleError("getWidthHeightScreen", message)
    }
}