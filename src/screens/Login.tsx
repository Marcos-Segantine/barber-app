import { Text, Pressable, View, StyleSheet, TextInput } from "react-native";

import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";
import { Title } from "../components/Title";
import { Button } from "../components/Button";

export const Login = ({ navigation }: any) => {
    return(
        <View style={style.container}>
            <Header />

            <Title title="Entre agora" />

            <View style={style.form}>
                <TextInput
                    style={style.input} 
                    placeholder="Email"
                    placeholderTextColor={"#FFFFFF80"}
                />

                <TextInput 
                    style={style.input}
                    placeholder="Digite sua senha"
                    placeholderTextColor={"#FFFFFF80"}
                />
                <View style={style.linksHelpUser}>
                    <Pressable onPress={() => navigation.navigate("Register")}>
                        <Text style={style.linkHelp}>Cadastrar</Text>
                    </Pressable>

                    <Pressable>
                        <Text style={style.linkHelp}>Esqueci minha senha</Text>
                    </Pressable>
                </View>

                <Button text="Entrar" />
            </View>

            <Footer />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        alignItems: "center"
    },

    form: {
        width: '80%',
        alignItems: "center",
        marginTop: '15%',
    },

    input: {
        borderWidth: 3,
        borderColor: "#E95401",
        borderRadius: 20,
        width: "100%",
        marginVertical: 5,
        paddingHorizontal: 13,
        paddingVertical: 17,
        fontWeight: '700',
        fontSize: 14
    },

    linksHelpUser: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
    },

    linkHelp: {
        color: "#FFFFFF",
    },
})