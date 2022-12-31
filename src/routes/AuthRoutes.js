import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Login } from "../screens/Login";
import { Services } from "../screens/Services";

const { Screen, Navigator } = createNativeStackNavigator()

export const AuthRoutes = () => {
    return(
        <Navigator>
            <Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Screen 
                name="Services"
                component={Services}
                options={{
                    headerShown: false
                }}
            />
        </Navigator>
    )
}