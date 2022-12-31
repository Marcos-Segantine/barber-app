import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './src/routes/AuthRoutes';
import { AppRoutes } from './src/routes/AppRoutes';

import { UserProvider } from './src/context/UserContext';

const App = () => {
  const user = false

  return (
    <NavigationContainer>
      <UserProvider>
        { user ? <AppRoutes /> : <AuthRoutes /> }
      </UserProvider>
    </NavigationContainer>

  );
};

export default App;
