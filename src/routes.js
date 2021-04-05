import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';

import Login from './pages/Login';
import Register from './pages/Register';

import Catalog from './pages/Catalog';
import MyDiscards from './pages/MyDiscards';
import ReadBarcode from './pages/ReadBarcode';
import Profile from './pages/Profile';
import Location from './pages/Location';

import UserContext from './contexts/UserContext';
import api from './services/api';

const width = Dimensions.get("screen").width;


export default function Routes(){
    const [points, setPoints] = useState(0);

    const AppStack = createStackNavigator();
    const Tab = createBottomTabNavigator();

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
                    ?( <Tab.Navigator 
                        initialRouteName="Meus descartes" 
                        tabBarOptions={{
                            activeTintColor: 'white', 
                            style: styles.drawer,

                            }}
                        hideStatusBar={true}

                        >
                            <Tab.Screen 
                            name="Catálogo" 
                            component={Catalog}
                            options={{
                                tabBarLabel: () => null,
                                tabBarIcon: () => 
                                <Icon 
                                    name='list' 
                                    size={30}
                                    color='white'
                                    style={styles.icon}
                                />,
                                }}
                            />

                            <Tab.Screen 
                            name="Meus descartes" 
                            component={MyDiscards}
                            options={{
                                tabBarLabel: () => null,
                                tabBarIcon: () =>
                                <Icon 
                                    name='trash-2' 
                                    size={30}
                                    color='white'
                                    style={styles.icon}
                                />,
                                }}
                            />
                            <Tab.Screen 
                            name="Novo Descarte" 
                            component={ReadBarcode}
                            options={{
                                tabBarLabel: () => null,
                                tabBarIcon: () => 
                                <Icon
                                    name='plus-circle'
                                    size={30}
                                    color='white'
                                    style={styles.icon}
                                />
                                }}
                            />
                            <Tab.Screen
                                name="Perfil"
                                component={Profile}
                                options={{
                                    tabBarLabel: () => null,
                                    tabBarIcon: () => 
                                        <Icon
                                            name='user'
                                            size={30}
                                            color='white'
                                            style={styles.icon}
                                        />
                                }}
                            />
                            <Tab.Screen
                                name="Localização"
                                component={Location}
                                options={{
                                    tabBarLabel: () => null,
                                    tabBarIcon: () => 
                                        <Icon
                                            name='map-pin'
                                            size={30}
                                            color='white'
                                            style={styles.icon}
                                        />
                                }}
                            />
                        </Tab.Navigator>
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
    //   flex: 1,
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