import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native";

import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";
import { Title } from "../components/Title";
import { Button } from "../components/Button";

export const Register = ({ navigation }: any) => {
    return(
        <SafeAreaView style={style.container}>
            <Header />

            <Title title="Cadastre-se agora" />

            <View style={style.form}>
                <TextInput 
                    placeholder="Nome completo"
                    placeholderTextColor={"#FFFFFF80"}
                    style={style.input}
                />
                <TextInput 
                    placeholder="Email"
                    placeholderTextColor={"#FFFFFF80"}
                    style={style.input}
                />
                <TextInput 
                    placeholder="Telefone"
                    placeholderTextColor={"#FFFFFF80"}
                    style={style.input}
                />
                <TextInput 
                    placeholder="Crie uma senha"
                    placeholderTextColor={"#FFFFFF80"}
                    style={style.input}
                />
                <TextInput 
                    placeholder="Crie uma senha"
                    placeholderTextColor={"#FFFFFF80"}
                    style={style.input}
                />
            </View>
            
            <View style={style.linksHelpUser}>
                <Pressable onPress={() => navigation.navigate("Register")}>
                    <Text style={style.linkHelp}>Login</Text>
                </Pressable>
            </View>

            <Button text="Cadastrar" />
            <Footer />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1E1E1E"
    },

    form: {
        width: "80%",
        alignItems: "center"
    },

    input: {
        borderWidth: 3,
        borderColor: "#E95401",
        borderRadius: 20,
        width: "100%",
        marginVertical: 3,
        paddingHorizontal: 13,
        paddingVertical: 17,
        fontWeight: '700',
        fontSize: 14
    },

    linksHelpUser: {
        width: "80%",
        alignItems: 'flex-end',
        marginTop: 10,
        paddingHorizontal: 15,
    },

    linkHelp: {
        color: "#FFFFFF",
    },
})