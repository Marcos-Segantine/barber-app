import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserProvider } from './src/context/UserContext';

import { InitialScreen } from './src/screens/InitialScreen';
import { Login } from './src/screens/Login'
import { Services } from "./src/screens/Services";
import { Professionals } from './src/screens/Professionals';
import { Calandar } from './src/screens/Calandar'
import { ConfirmSchedule } from './src/screens/ConfirmSchedule'
import { FinalScreen } from './src/screens/FinalScreen'
import { Schedules } from './src/screens/Schedules'

const { Screen, Navigator } = createNativeStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <UserProvider>
        
      <Navigator 
        initialRouteName='Calandar'
        >

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

          <Screen 
              name="Professionals"
              component={Professionals}
              options={{
                  headerShown: false
              }}
          />

          <Screen
            name='Calandar'
            component={Calandar}
            options={{
              headerShown: false
            }}
          />

          <Screen
            name='ConfirmSchedule'
            component={ConfirmSchedule}
            options={{
              headerShown: false
            }}
          />

          <Screen
            name='FinalScreen'
            component={FinalScreen}
            options={{
              headerShown: false
            }}
          />

          <Screen
            name='Schedules'
            component={Schedules}
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
