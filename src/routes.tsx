import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator, BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/Feather";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Catalog from "./pages/Catalog";
import ReadBarcode from "./pages/ReadBarcode";
import Profile from "./pages/Profile";
import TrashControl from "./pages/TrashControl";
import UserControl from "./pages/UserControl";

import colors from "./styles/colors";
import UserContext from "./contexts/UserContext";

type troleToScreen = {
    [key: string]: Element,
}

export default function Routes() {
    const AppStack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    
    let { isSigned, role } = useContext(UserContext);

    // isSigned = false;

    const commonTabs = (
        <Tab.Screen
            name="Catálogo"
            component={Catalog}
            options={{
            tabBarLabel: () => null,
            tabBarIcon: () => (
                <Icon 
                name="list" 
                size={27} 
                color="white" 
                style={styles.icon} 
                />
            ),
            }}
        />
    )

    const userTabs = (
            <>
                <Tab.Screen
                name="Novo Descarte"
                component={ReadBarcode}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => (
                    <Icon
                        name="plus-circle"
                        size={38}
                        color="white"
                        style={styles.icon}
                    />
                    ),
                }}
                />
                <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => (
                    <Icon name="user" size={27} color="white" style={styles.icon} />
                    ),
                }}
                />
            </>
    )

    const adminTabs = (
        <>
            <Tab.Screen
                name="Controle de Lixeiras"
                component={TrashControl}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => (
                    <Icon 
                        name='trash-2' 
                        size={27} 
                        color="white" 
                        style={styles.icon}
                    />
                    )
                }}
            />
            <Tab.Screen
                name="Controle de Usuários"
                component={UserControl}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => (
                    <Icon 
                        name='users' 
                        size={27} 
                        color="white" 
                        style={styles.icon}
                    />
                    )
                }}
            />
            
        </>
    )

    const roleToScreen: troleToScreen = {
        "user": userTabs,
        "admin": adminTabs,
        "collector": adminTabs
    }
    
    return (
        <NavigationContainer>
        {isSigned ? (
            <Tab.Navigator
            initialRouteName="Perfil"
            tabBarOptions={{
                activeTintColor: "red",
                style: styles.tab,
                safeAreaInsets: {"top": 2},
            }}
            >
            {commonTabs}
            {roleToScreen[role.toLowerCase()]}
            
            </Tab.Navigator>
        ) : (
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="Login" component={Login} />
            <AppStack.Screen name="Register" component={Register} />
            </AppStack.Navigator>
        )}
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: colors.green_light,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  icon: {
    opacity: 0.8,
  },
});
