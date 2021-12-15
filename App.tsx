import React from 'react';
import { StatusBar, LogBox } from 'react-native';

import { 
    Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import {
  useFonts, UbuntuCondensed_400Regular
} from '@expo-google-fonts/ubuntu-condensed';

import Routes from './src/routes';
import {UserProvider} from './src/contexts/UserContext';
import { ProductsProvider } from './src/contexts/ProductsContext';

export default function App() {
  useFonts({
    Roboto_700Bold,
    UbuntuCondensed_400Regular,
  });

//   LogBox.ignoreAllLogs();

  return (
    <UserProvider>
        <ProductsProvider>
            <StatusBar hidden/>
            <Routes />
        </ProductsProvider>
    </UserProvider>
  );
}