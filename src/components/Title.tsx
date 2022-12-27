import { Text, StyleSheet } from "react-native"

interface ITitle {
    title: string
}

export const Title: React.FC<ITitle> = ({ title }) => {
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