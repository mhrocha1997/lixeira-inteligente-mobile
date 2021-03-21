import 'react-native-gesture-handler';

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import Catalog from '../pages/Catalog';
import MyDiscards from './MyDiscards';


export default function Dashboard({ navigation}){
    const Drawer = createDrawerNavigator();
    
    return(
        <NavigationContainer independent={true}>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Catalog} />
                <Drawer.Screen name="Meus descartes" component={MyDiscards} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}