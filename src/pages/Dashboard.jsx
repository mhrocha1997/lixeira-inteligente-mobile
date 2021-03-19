import 'react-native-gesture-handler';

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import Catalogo from '../pages/Catalogo';
import Produtos from '../pages/Produtos';


export default function Dashboard({ navigation}){
    const Drawer = createDrawerNavigator();
    
    return(
        <NavigationContainer independent={true}>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Catalogo} />
                <Drawer.Screen name="Produtos" component={Produtos} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}