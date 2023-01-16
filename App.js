import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from './src/context/UserContext';
import { ShedulesUserProvider } from './src/context/ShedulesUser';

import { UserScreens } from './src/screens/UserScreens/routes';

import { Header } from './src/shared/Header';
import { Footer } from './src/shared/Footer';

const App = () => {

  return (
    <NavigationContainer>
      <UserProvider>
        <Header />

        <ShedulesUserProvider>

          <UserScreens />
        
        </ShedulesUserProvider>

        <Footer />

      </UserProvider>
    </NavigationContainer>

  );
};

export default App;
