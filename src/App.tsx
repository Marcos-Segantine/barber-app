import { Text } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { InitialScreen } from "./screens/InitialScreen"
import { Login } from "./screens/Login"
import { Register } from "./screens/Register"
import { Services } from "./screens/Services"
import { Professionals } from "./screens/Professionals"
import { Calandar } from "./screens/Calandar"
import { Schedules } from "./screens/Schedules"

const {Screen, Navigator} = createNativeStackNavigator()

export const App = () => {
  return(
    <NavigationContainer>
      <Navigator initialRouteName="Schedules">
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

        <Screen 
          name="Services"
          component={Services}
          options={{
            headerShown: false
          }}
        />

        <Screen 
          name="Professionals"
          component={Professionals}
          options={{
            headerShown: false
          }}
        />

        <Screen
          name="Calandar"
          component={Calandar}
          options={{
            headerShown: false
          }}
        />

        <Screen 
          name="Schedules"
          component={Schedules}
          options={{
            headerShown: false
          }}
        />

      </Navigator>
    </NavigationContainer>
  )
} 