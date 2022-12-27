import { Text, View, StyleSheet, Pressable } from "react-native"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

import { Header } from "../shared/Header"
import { Footer } from "../shared/Footer"

export const FinalScreen = () => {
    return(
        <View style={style.container}>
            <Header />

            <Svg
                width={414}
                height={416}
                viewBox="0 0 414 416"
                fill="none"
                >
                <Path fill="url(#pattern0)" d="M0 0H414V416H0z" />
                <Defs>
                    <Pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                    >
                    <Use
                        xlinkHref="#image0_8_1582"
                        transform="translate(-.002) scale(.00093)"
                    />
                    </Pattern>
                    <Image
                    id="image0_8_1582"
                    width={1080}
                    height={1080}
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDgAAAQ4CAYAAADsEGyPAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA5LTA5VDE1OjI2OjE3LTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA5LTA5VDE1OjI2OjE3LTAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wOS0wOVQxNToyNjoxNy0wMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjZTU4OGZmMy1kOTkxLWVkNGUtODIyMy1iNzE1YzNmMGQ3M2QiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1OTQ1MDI5Ny1mNjhjLTZlNDMtYTcyNi00NDZjYTFmY2M5ZWEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyYWQxZTk4OC04M2YwLWEyNDktYTkyNi04ZmNjOTQ1NjIyZjYiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyYWQxZTk4OC04M2YwLWEyNDktYTkyNi04ZmNjOTQ1NjIyZjYiIHN0RXZ0OndoZW49IjIwMjItMDktMDlUMTU6MjY6MTctMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2U1ODhmZjMtZDk5MS1lZDRlLTgyMjMtYjcxNWMzZjBkNzNkIiBzdEV2dDp3aGVuPSIyMDIyLTA5LTA5VDE1OjI2OjE3LTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+yIY+ZAAALClJREFUeJzt3T9vZFlex+FbVS1jg0yyYpN9D4RILCEvgIAdjYnnDbCSs0ViEzIC3sCmqFuDSMiJ+BOQ8Rpmk0VLAHKj1rRtgh63y+5yuerWvfec7znPk7Vm5LmjqT5d5zO/c+7q/v5+AAAAAEi2Lv0AAAAAAKcSOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAAQDyBAwAAAIgncAAAAADxBA4AAAAgnsABAAAAxBM4AAAAgHgCBwAAABBP4AAAAADiCRwAAABAPIEDAAAAiCdwAAAAAPEEDgAAACCewAEAAADEEzgAAACAeAIHAAAAEE/gAAAAAOIJHAAAAEA8gQMAAACIJ3AAAAAA8QQOAAAAIJ7AAQAAAMQTOAAAAIB4AgcAAAAQT+AAAAAA4gkcAAAA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"
                    />
                </Defs>
            </Svg>

            <Pressable style={style.goBackButton}>
                <Text style={style.textGoBack}>Voltar ao inicio</Text>
            </Pressable>

            <Footer />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
        alignItems: "center"
    },

    goBackButton: {
        width: '60%',
        borderColor: "#E95401",
        borderWidth: 3,
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 15,
    },

    textGoBack: {
        color: "#E95401",
        fontWeight: '700',
    }
})