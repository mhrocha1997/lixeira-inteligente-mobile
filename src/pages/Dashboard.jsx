import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import {StyleSheet, Text} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

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
            <Drawer.Navigator 
              initialRouteName="Meus descartes" 
              drawerContentOptions={{
                  activeTintColor: 'white', 
                  contentContainerStyle: styles.drawer,
                }}
              hideStatusBar={true}
              screenOptions={{
                headerShown: true,
                headerLeft: () => null,
                headerRight: () => 
                  <Text style={styles.header}> 600 xp</Text>,
                headerTitle: () => null,
                headerStyle: styles.headerContainer
                
              }}
            >
                <Drawer.Screen 
                  name="Catálogo" 
                  component={Catalog}
                  options={{
                    // drawerLabel: () => null,
                    drawerIcon: () => 
                      <Icon 
                        name='list' 
                        size={30}
                      />,
                    }}
                />

                <Drawer.Screen 
                  name="Meus descartes" 
                  component={MyDiscards}
                  options={{
                    // drawerLabel: () => null,
                    drawerIcon: () =>
                      <Icon 
                        name='trash-outline' 
                        size={30}
                      />,
                    }}
                />
                <Drawer.Screen 
                  name="Novo Descarte" 
                  component={ReadBarcode}
                  options={{
                      drawerLabel: () => null,
                      title: undefined,
                      drawerIcon: () => null
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  drawer:{
    // alignItems: 'center',
    backgroundColor: '#31ce8c',
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    margin: 5,
    fontSize: 18,
  },
  headerContainer: {
    backgroundColor: '#31ce8c',
    height: 60,
    justifyContent: 'center'
  }
})