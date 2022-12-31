import { Text, StyleSheet } from "react-native"

export const Title = ({ title }) => {
    return(
        <Text style={style.title}>{title}</Text>
    )
}

const style = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: "#FFFFFF",
    }
})