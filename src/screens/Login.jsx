import { Text, Pressable, View, StyleSheet, TextInput } from "react-native";

import { useState } from "react";

import { Header } from "../shared/Header";
import { Footer } from "../shared/Footer";
import { Title } from "../components/Title";
import { Button } from "../components/Button";

import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({ navigation }) => {
    
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleLogin = async() => {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then(async() => {
            await AsyncStorage.setItem('@barber_app__email', email)
            await AsyncStorage.setItem('@barber_app__password', password)

            navigation.navigate("Services")
        })
        .catch(err => console.log(err))
        }

    return(
        <View style={style.container}>
            <Header />

            <Title title="Entre agora" />

            <View style={style.form}>
                <TextInput
                    onChangeText={text => setEmail(text)}
                    style={style.input} 
                    placeholder="Email"
                    placeholderTextColor={"#FFFFFF80"}
                />

                <TextInput 
                    onChangeText={text => setPassword(text)}
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

                <Button text="Entrar" action={handleLogin} />
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
        fontSize: 14,
        color: "#FFFFFF80"
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