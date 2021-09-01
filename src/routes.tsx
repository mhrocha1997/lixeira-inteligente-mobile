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

import UserContext from "./contexts/UserContext";

export default function Routes() {
  const AppStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // const { isSigned } = useContext(UserContext);

  const isSigned = true;

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
          <Tab.Screen
            name="Catálogo"
            component={Catalog}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: () => (
                <Icon name="list" size={27} color="white" style={styles.icon} />
              ),
            }}
          />
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
    backgroundColor: "#31ce8c",
  },
  icon: {
    opacity: 0.8,
  },
});
