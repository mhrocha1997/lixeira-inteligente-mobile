import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';


import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Feather';

import Login from './pages/Login';
import Register from './pages/Register';

import Catalog from './pages/Catalog';
import MyDiscards from './pages/MyDiscards';
import ReadBarcode from './pages/ReadBarcode';

import UserContext from './contexts/UserContext';
import api from './services/api';

const width = Dimensions.get("screen").width;


export default function Routes(){
    const [points, setPoints] = useState(0);

    const AppStack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    const {isSigned, token} = useContext(UserContext);
    
    useEffect(() => {
        async function getPoints(){
            const response =  await api.get('/get/user', {'headers': {'Authorization': token}});
            setPoints(response.data.data[0].points);
        }
        getPoints();
    },[])

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
                            <Text style={styles.header}> {points} xp</Text>,
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
                                    size={28}
                                    color='white'
                                    style={styles.icon}
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
                                    name='trash-2' 
                                    size={28}
                                    color='white'
                                    style={styles.icon}
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
      color: 'white'
    },
    headerContainer: {
      backgroundColor: '#31ce8c',
      height: 60,
      justifyContent: 'center'
    },
    icon:{
        opacity: 0.8
    }
  })