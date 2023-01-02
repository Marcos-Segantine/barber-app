import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserProvider } from './src/context/UserContext';

import { InitialScreen } from './src/screens/InitialScreen';
import { Login } from './src/screens/Login'
import { Services } from "./src/screens/Services";

const { Screen, Navigator } = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        
      <Navigator initialRouteName='InitialScreen'>
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
                name="Services"
                component={Services}
                options={{
                    headerShown: false
                }}
            />
        </Navigator>

      </UserProvider>
    </NavigationContainer>

  );
};

export default App;
