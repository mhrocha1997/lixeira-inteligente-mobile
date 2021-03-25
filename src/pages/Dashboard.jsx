import 'react-native-gesture-handler';

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import Catalog from '../pages/Catalog';
import MyDiscards from './MyDiscards';
import ReadBarcode from './ReadBarcode';

export default function Dashboard({ navigation }){
    const Drawer = createDrawerNavigator();
    
    return(
        <NavigationContainer independent={true}>
            <Drawer.Navigator initialRouteName="Meus descartes" screenOptions={{headerShown: false}}>
                <Drawer.Screen name="Catálogo" component={Catalog} />
                <Drawer.Screen name="Meus descartes" component={MyDiscards} />
                <Drawer.Screen name="Novo Descarte" component={ReadBarcode} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}