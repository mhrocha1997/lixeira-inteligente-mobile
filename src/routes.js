import React, {useState} from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();
import Login from './pages/Login';
import Register from './pages/Register';
import { StyleSheet } from 'react-native';

export default function Routes(){
    const [isSignedIn,setIsSignedIn] = useState(true);

    return(
        <NavigationContainer>
            { isSignedIn 
                ?( <AppStack.Navigator screenOptions={{headerShown: false}}>
                        <AppStack.Screen name ="Login" component = {Login} />
                        <AppStack.Screen name ="Register" component = {Register} />
                    </AppStack.Navigator>
                    ) : (
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