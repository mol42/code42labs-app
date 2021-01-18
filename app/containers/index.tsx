import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// web modunda iken alttaki paket 
// Attempted import error: 'shouldUseActivityState' is not exported from 'react-native-screens'
// hatasi veriyor dolayisi ile bu sorunu asabilmek icin
// react-navigation-bottom-tabs-no-warnings paketi kuruldu.
// Sorun ana paket icinde cozuldugu zaman yardimci kutuphane yerine
// ana kutuphaneye gececegiz.
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-bottom-tabs-no-warnings';

import LoginScreen from "./login/login";
import WelcomeScreen from './welcome/welcome';

const MainStack = createStackNavigator();
const TabbedStack = createBottomTabNavigator();

function TabScreen() {
  return (
    <TabbedStack.Navigator lazy={true}>
      <TabbedStack.Screen name="Home" component={LoginScreen} />
      <TabbedStack.Screen name="Settings" component={LoginScreen} />
    </TabbedStack.Navigator>)
}

export default function RootNavigationContainer() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="TabScreen" component={TabScreen} />
    </MainStack.Navigator>
  );
}