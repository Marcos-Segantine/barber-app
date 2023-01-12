import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native";

import { Header } from "../../../shared/Header";
import { Footer } from "../../../shared/Footer";
import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Register = ({ navigation }) => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ comfirmPassword, setComfirmPassword ] = useState('')

    const handleResgister = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async(res) => {
                firestore()
                    .collection('users')
                    .doc(res.user.uid)
                    .set({
                        name: name || 'User teste',
                        email: email,
                        phone: phone,
                        uid: res.user.uid
                    })
                await AsyncStorage.getItem("@barber_app__email")
                await AsyncStorage.getItem("@barber_app__password")
                
                navigation.navigate("Services")
            })
            .catch((err) => console.log(err))
    }

    return(
        <SafeAreaView style={style.container}>
            <Header />

            <Title title="Cadastre-se agora" />

            <View style={style.form}>
                <TextInput 
                    onChangeText={text => setName(text)}
                    placeholder="Nome completo"
                    placeholderTextColor={"#FFFFFF80"}
                    style={style.input}
                />
                <TextInput 
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    placeholderTextColor={"#FFFFFF80"}
                    style={style.input}
                />
                <TextInput 
                    onChangeText={text => setPhone(text)}
                    placeholder="Telefone"
                    placeholderTextColor={"#FFFFFF80"}
                    style={style.input}
                />
                <TextInput
                    onChangeText={text => setPassword(text)}
                    placeholder="Crie uma senha"
                    placeholderTextColor={"#FFFFFF80"}
                    style={style.input}
                />
                <TextInput
                    onChangeText={text => setComfirmPassword(text)}
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

            <Button text="Cadastrar" action={handleResgister} />
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
        fontSize: 14,
        color: "#FFFFFF80"
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