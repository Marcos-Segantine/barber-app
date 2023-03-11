import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {UserProvider} from './src/context/UserContext';
import {ShedulesUserProvider} from './src/context/ShedulesUser';
import {UserVerifiedProvider} from './src/context/UserVerified';

import {UserScreens} from './src/screens/routes';

const App = () => {
  return (
    <NavigationContainer>
      <UserVerifiedProvider>
        <UserProvider>
          <ShedulesUserProvider>
            <UserScreens />
          </ShedulesUserProvider>
        </UserProvider>
      </UserVerifiedProvider>
    </NavigationContainer>
  );
};

export default App;
