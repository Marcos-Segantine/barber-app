import { Text, View, Pressable, StyleSheet } from "react-native";

import { Header } from "../../shared/Header";
import { Footer } from "../../shared/Footer";

import { Title } from "../../components/Title";
import { Button } from "../../components/Button";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

export const YourInformation = () => {
    const { user } = useContext(UserContext)

    return(
        <View style={style.container}>
            <Header />

            <Title title={"Suas informações"} />

            <View style={style.content}>
                <Pressable style={style.info}>
                    <Text style={style.text}>Nome: {user.name ? user.name : "---"} </Text>
                </Pressable>

                <Pressable style={style.info}>
                    <Text style={style.text}>
                        Email: {user.email ? user.email : "   ---------"}
                    </Text>
                </Pressable>

                <Pressable style={style.info}>
                    <Text style={style.text}>
                        Telefone: {user.phone ? user.phone : "   ---------"}
                    </Text>
                </Pressable>
            </View>        

            <Button text={"Alterar informações"} />    

            <Footer />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "#1E1E1E",
        flex: 1,
        alignItems: 'center',
    },

    content: {
        width: "100%",
        alignItems: "center",
        marginVertical: 70
    },

    info: {
        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#E95401",
        width: "80%",
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 20
    },

    text: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 17
    }
})