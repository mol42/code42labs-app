import "react-native-gesture-handler";
import * as React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
// web modunda iken alttaki paket
// Attempted import error: 'shouldUseActivityState' is not exported from 'react-native-screens'
// hatasi veriyor dolayisi ile bu sorunu asabilmek icin
// react-navigation-bottom-tabs-no-warnings paketi kuruldu.
// Sorun ana paket icinde cozuldugu zaman yardimci kutuphane yerine
// ana kutuphaneye gececegiz.
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from "react-navigation-bottom-tabs-no-warnings";
import { RootState } from "../redux/root-reducer";

import LoginScreen from "./login/login";
import WelcomeScreen from "./welcome/welcome";
import DashboardScreen from "./dashboard/dashboard";
import SignupScreen from "./signup/signup";
import MySkillsScreen from "./my-skills/my-skills";
import SkillsScreen from "./skills/skills";
import SettingsScreen from "./settings/settings";
import SkillDetailScreen from "./skill-detail/skill-detail";
import SkillStepDetailScreen from "./skill-step-detail/skill-step-deatail";

const MainStack = createStackNavigator();
const SkillsStack = createStackNavigator();
const MySkillsStack = createStackNavigator();
const TabbedStack = createBottomTabNavigator();

function SkillsTab() {
  return (
    <SkillsStack.Navigator>
      <SkillsStack.Screen name="SkillsScreen" component={SkillsScreen} options={{ headerShown: false }} />
      <SkillsStack.Screen name="SkillDetailScreen" component={SkillDetailScreen} options={{ headerShown: false }} />
      <SkillsStack.Screen name="SkillStepDetailScreen" component={SkillStepDetailScreen} options={{ headerShown: false }} />
    </SkillsStack.Navigator>
  );
}

function MySkillsTab() {
  return (
    <MySkillsStack.Navigator>
      <MySkillsStack.Screen name="MySkillsScreen" component={MySkillsScreen} options={{ headerShown: false }} />
      <MySkillsStack.Screen name="SkillDetailScreen" component={SkillDetailScreen} options={{ headerShown: false }} />
      <MySkillsStack.Screen name="SkillStepDetailScreen" component={SkillStepDetailScreen} options={{ headerShown: false }} />
    </MySkillsStack.Navigator>
  );
}

function TabScreen() {
  return (
    <TabbedStack.Navigator lazy={true}>
      <TabbedStack.Screen name="DashboardScreen" component={DashboardScreen} />
      <TabbedStack.Screen name="MySkillsTab" component={MySkillsTab} />
      <TabbedStack.Screen name="SkillsTab" component={SkillsTab} />
      <TabbedStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </TabbedStack.Navigator>
  );
}

export default function RootNavigationContainer(props: any): JSX.Element {
  const authState = useSelector((state: RootState) => state.auth);
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {authState.user ? (
        <MainStack.Screen name="TabScreen" component={TabScreen} />
      ) : (
        <>
          <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <MainStack.Screen name="LoginScreen" component={LoginScreen} />
          <MainStack.Screen name="SignupScreen" component={SignupScreen} />
        </>
      )}
    </MainStack.Navigator>
  );
}
