import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from './src/context/UserContext';
import { ShedulesUserProvider } from './src/context/ShedulesUser';

import { UserScreens } from './src/screens/UserScreens/routes';

const App = () => {

  return (
    <NavigationContainer>
      <UserProvider>

        <ShedulesUserProvider>

          <UserScreens />
        
        </ShedulesUserProvider>

      </UserProvider>
    </NavigationContainer>

  );
};

export default App;
