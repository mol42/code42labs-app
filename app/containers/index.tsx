import 'react-native-gesture-handler';
import * as React from 'react';
import { useSelector } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
// web modunda iken alttaki paket 
// Attempted import error: 'shouldUseActivityState' is not exported from 'react-native-screens'
// hatasi veriyor dolayisi ile bu sorunu asabilmek icin
// react-navigation-bottom-tabs-no-warnings paketi kuruldu.
// Sorun ana paket icinde cozuldugu zaman yardimci kutuphane yerine
// ana kutuphaneye gececegiz.
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-bottom-tabs-no-warnings';
import { RootState } from "../redux/root-reducer";

import LoginScreen from "./login/login";
import WelcomeScreen from './welcome/welcome';
import DashboardScreen from "./dashboard/dashboard";

const MainStack = createStackNavigator();
const TabbedStack = createBottomTabNavigator();

function TabScreen() {
  return (
    <TabbedStack.Navigator lazy={true}>
      <TabbedStack.Screen name="Home" component={DashboardScreen} />
      <TabbedStack.Screen name="Settings" component={DashboardScreen} />
    </TabbedStack.Navigator>)
}

export default function RootNavigationContainer(props: any) {
  const authState = useSelector((state: RootState) => state.auth);
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {authState.user ? (
        <MainStack.Screen name="TabScreen" component={TabScreen} />
      ) : (
          <>
            <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <MainStack.Screen name="LoginScreen" component={LoginScreen} />
          </>
        )}
    </MainStack.Navigator>
  );
}