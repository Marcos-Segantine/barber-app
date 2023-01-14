import {  View, StyleSheet } from "react-native";

import { useContext } from "react";

import { Header } from "../../../shared/Header";
import { Footer } from "../../../shared/Footer";
import { Button } from "../../../components/Button";

import { UserContext } from "../../../context/UserContext";

import InitialScreenSvg from '../../../assets/InitialScreenSvg'

import { globalStyles } from "../../globalStyles";

export const InitialScreen = ({ navigation }) => {
    const { userData } = useContext(UserContext);

    const handleButton = () => {
        userData ?
        navigation.navigate("Services") :
        navigation.navigate("Login") 
    }

    return(
        <View style={globalStyles.container}>
            <Header isInitialScreen={true} />
            
            <View style={style.hero}>
                <InitialScreenSvg />
            </View>

            <Button text="Agende seu horário" action={handleButton}
             />

            <Footer />
        </View>
    )
}

const style = StyleSheet.create({
    hero : {
        alignItems: "center"
    },
})