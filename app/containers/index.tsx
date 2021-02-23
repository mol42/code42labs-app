import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useSelector } from "react-redux";
// import { createStackNavigator } from "@react-navigation/stack";
// web modunda iken alttaki paket
// Attempted import error: 'shouldUseActivityState' is not exported from 'react-native-screens'
// hatasi veriyor dolayisi ile bu sorunu asabilmek icin
// react-navigation-bottom-tabs-no-warnings paketi kuruldu.
// Sorun ana paket icinde cozuldugu zaman yardimci kutuphane yerine
// ana kutuphaneye gececegiz.
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from "react-navigation-bottom-tabs-no-warnings";
import { RootState } from "../redux/root-reducer";
import { I18nContext } from "../config/i18n";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import LoginScreen from "./login/login";
import WelcomeScreen from "./welcome/welcome";
import DashboardScreen from "./dashboard/dashboard";
import SignupScreen from "./signup/signup";
import MySkillsScreen from "./my-skills/my-skills";
import SkillsScreen from "./skills/skills";
import SettingsScreen from "./settings/settings";
import SkillDetailScreen from "./skill-detail/skill-detail";
import SkillStepDetailScreen from "./skill-step-detail/skill-step-detail";
import SkillNewsDetailScreen from "./skill-news-detail/skill-news-detail";

enableScreens();

const MainStack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();
const SkillsStack = createNativeStackNavigator();
const MySkillsStack = createNativeStackNavigator();
const TabbedStack = createBottomTabNavigator();

const TAB_TITLE_KEYS = ["tab_dashboard", "tab_my_skills", "tab_all_skills", "tab_settings"];

function resolveTabIcon(index: number, selectedIndex: number) {
  const isFocused = selectedIndex === index;

  if (index === 0) {
    return <Ionicons name="home" size={24} color={isFocused ? "#673ab7" : "#222" } />;
  } else if (index === 1) {
    return <Ionicons name="bookmark" size={24} color={isFocused ? "#673ab7" : "#222" } />;
  } else if (index === 2) {
    return <Ionicons name="md-list-circle" size={24} color={isFocused ? "#673ab7" : "#222" } />;
  } else if (index === 3) {
    return <Ionicons name="ios-settings" size={24} color={isFocused ? "#673ab7" : "#222" } />;
  }
  return null;
}

function MyTabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const polyglot = I18nContext.polyglot;
  const safeAreaInsets = useSafeAreaInsets();

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, height: 50 + safeAreaInsets.bottom, justifyContent: "center", alignItems: "center" }}
          >
            {resolveTabIcon(index, state.index)}
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {polyglot?.t(TAB_TITLE_KEYS[index])}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function DashboardTab() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }} />
      <DashboardStack.Screen name="SkillNewsDetailScreen" component={SkillNewsDetailScreen} options={{ headerShown: false }} />
    </DashboardStack.Navigator>
  );
}

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
    <TabbedStack.Navigator tabBar={props => <MyTabBar {...props} />} lazy={true}>
      <TabbedStack.Screen name="DashboardTab" component={DashboardTab} />
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
