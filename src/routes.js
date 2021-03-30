import React, {useState} from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import 'react-native-gesture-handler';

import {StyleSheet, Text} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import Catalog from './pages/Catalog';
import MyDiscards from './pages/MyDiscards';
import ReadBarcode from './pages/ReadBarcode';
import AsyncStorage from '@react-native-community/async-storage'


import Login from './pages/Login';
import Register from './pages/Register';

export default function Routes(){
    const [isSignedIn,setIsSignedIn] = useState(true);


    const AppStack = createStackNavigator();
    const Drawer = createDrawerNavigator();

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
        <NavigationContainer>
            { isSignedIn 
                ?( <Drawer.Navigator 
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
                ) : (
                    <AppStack.Navigator screenOptions={{headerShown: false}}>
                        <AppStack.Screen name ="Login" component = {Login} />
                        <AppStack.Screen name ="Register" component = {Register} />
                    </AppStack.Navigator>
                )
            }
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