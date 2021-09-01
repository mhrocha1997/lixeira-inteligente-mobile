import React from 'react';
import { StatusBar } from 'react-native';

import { 
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import {
  useFonts, UbuntuCondensed_400Regular
} from '@expo-google-fonts/ubuntu-condensed';

import Routes from './src/routes';
import {UserProvider} from './src/contexts/UserContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    UbuntuCondensed_400Regular,
  });

  return (
    <UserProvider>
      <StatusBar hidden/>
      <Routes />
    </UserProvider>
  );
}
