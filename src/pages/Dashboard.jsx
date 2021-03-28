import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import Catalog from '../pages/Catalog';
import MyDiscards from './MyDiscards';
import ReadBarcode from './ReadBarcode';
import AsyncStorage from '@react-native-community/async-storage'

export default function Dashboard({ navigation }){
    const Drawer = createDrawerNavigator();

    // Pegando token
    useEffect( () => {

        async function verifyToken(){
            try {
                console.log("lendo token...");
                const token =  AsyncStorage.getItem('token');
                if(token !== null) {
                  const response = await api.get('/token', {'headers': {"Authorization": token}});
      
                  if(response.status != 200) navigation.navigate("Login");
      
                }   
              } catch(e) {
                console.log("Erro ao ler o token");
              }
        }
        
        verifyToken();
      },[])

    
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