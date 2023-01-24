import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {UserProvider} from './src/context/UserContext';
import {ShedulesUserProvider} from './src/context/ShedulesUser';
import {UserVerifiedProvider} from './src/context/UserVerified';

import {UserScreens} from './src/screens/UserScreens/routes';

import {Header} from './src/shared/Header';
import {Footer} from './src/shared/Footer';

const App = () => {
  return (
    <NavigationContainer>
      <UserVerifiedProvider>
        
        <UserProvider>
          <Header />

          <ShedulesUserProvider>
            <UserScreens />
          </ShedulesUserProvider>

          <Footer />
        </UserProvider>

      </UserVerifiedProvider>
    </NavigationContainer>
  );
};

export default App;
