import React, {useContext} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';


import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

import Login from './pages/Login';
import Register from './pages/Register';

import Catalog from './pages/Catalog';
import MyDiscards from './pages/MyDiscards';
import ReadBarcode from './pages/ReadBarcode';

import UserContext from './contexts/UserContext';

const width = Dimensions.get("screen").width;


export default function Routes(){

    const AppStack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    const {isSigned, token} = useContext(UserContext);
    
    console.log("Está logado:", isSigned);


    return(
            <NavigationContainer>
                { isSigned
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
                        drawerStyle={{
                            width: width*0.65
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
    //   justifyContent: 'center',
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