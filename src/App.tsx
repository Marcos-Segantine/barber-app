import { Text } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { InitialScreen } from "./screens/InitialScreen"
import { Login } from "./screens/Login"
import { Register } from "./screens/Register"

const {Screen, Navigator} = createNativeStackNavigator()

export const App = () => {
  return(
    <NavigationContainer>
      <Navigator>
        <Screen 
          name="InitialScreen" 
          component={InitialScreen} 
          options={{
            headerShown: false
          }} 
        />
        <Screen 
          name="Login" 
          component={Login} 
          options={{
            headerShown: false
          }} 
        />

        <Screen 
          name="Register"
          component={Register}
          options={{
            headerShown: false
          }}
        />

      </Navigator>
    </NavigationContainer>
  )
} 