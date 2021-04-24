import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';

import {UserProvider} from './src/contexts/UserContext';

export default function App() {
  return (
    <UserProvider>
      <StatusBar hidden/>
      <Routes />
    </UserProvider>
  );
}
