import { Text, Pressable, StyleSheet } from "react-native";

export const Button = ({ text, action }) => {
    return(
        <Pressable onPress={action} style={style.button}>
            <Text style={style.text}>{text}</Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    button: {
        backgroundColor: "#E95401",
        width: "65%",
        alignItems: "center",
        marginTop: 40,
        borderRadius: 10,
        paddingHorizontal: 55,
        paddingVertical: 13,
    },

    text: {
        color: "#FFFFFF",
        fontWeight: '700',
    }
})