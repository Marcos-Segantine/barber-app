import { StyleSheet, Text, View, Pressable } from "react-native"

export const Footer = () => {
    return(
        <View style={style.container}>
            <Text style={style.message}>
                Todos os direitos reservados @empresa
            </Text>

            <Pressable style={style.buttonContact}>
                <Text style={style.textContact}>Contato</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        marginTop: 20,
        position: 'absolute',
        bottom: 10
    },

    message: {
        color: "#FFFFFF",
        fontSize: 10,
    },

    buttonContact: {
        borderColor: "#E95401",
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 2,
        marginTop: 11,
        alignItems: 'center'
    },

    textContact: {
        color: "#FFFFFF",
    }
})