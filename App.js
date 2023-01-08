import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserProvider } from './src/context/UserContext';
import { ShedulesUserProvider } from './src/context/ShedulesUser';

import { InitialScreen } from './src/screens/InitialScreen';
import { Login } from './src/screens/Login'
import { Register } from './src/screens/Register';
import { Services } from "./src/screens/Services";
import { Professionals } from './src/screens/Professionals';
import { Calandar } from './src/screens/Calandar'
import { ConfirmSchedule } from './src/screens/ConfirmSchedule'
import { FinalScreen } from './src/screens/FinalScreen'
import { Schedules } from './src/screens/Schedules'

import { Main } from './src/screens/personal-user-screens/Main';
import { YourSchedules } from './src/screens/personal-user-screens/YourSchedules';
import { InfoSchedule } from './src/screens/personal-user-screens/InfoSchedule';
import { CancelScreen } from './src/screens/personal-user-screens/CancelScreen,';
import { YourInformation } from './src/screens/personal-user-screens/YourInformation';

const { Screen, Navigator } = createNativeStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <UserProvider>

        <ShedulesUserProvider>
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

            <Screen
              name='Main'
              component={Main}
              options={{
                headerShown: false
              }}
            />

            <Screen
              name='YourSchedules'
              component={YourSchedules}
              options={{
                headerShown: false
              }}
            />

            <Screen
              name='InfoSchedule'
              component={InfoSchedule}
              options={{
                headerShown: false
              }}
            />

            <Screen
              name='CancelScreen'
              component={CancelScreen}
              options={{
                headerShown: false
              }}
            />

            <Screen
              name='YourInformation'
              component={YourInformation}
              options={{
                headerShown: false
              }}
            />

          </Navigator>
        </ShedulesUserProvider>

      </UserProvider>
    </NavigationContainer>

  );
};

export default App;
