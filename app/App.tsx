import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// web modunda iken alttaki paket 
// Attempted import error: 'shouldUseActivityState' is not exported from 'react-native-screens'
// hatasi veriyor dolayisi ile bu sorunu asabilmek icin
// react-navigation-bottom-tabs-no-warnings paketi kuruldu.
// Sorun ana paket icinde cozuldugu zaman yardimci kutuphane yerine
// ana kutuphaneye gececegiz.
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-bottom-tabs-no-warnings';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './redux/root-reducer';
// bu import sayesinde react-navigation'un ana kapsayici nesnesinin
// referansina erisebiliyoruz ve onun yardimi ile uygulamanin herhangi
// bir noktasinda referans objesini import ettigimizde navigasyon
// islemlerini cagirabiliyoruz.
// Ornegin redux thunk kodlari icinde cagirabilir hale geliyoruz.
// Bu yapi sahsen benim tavsiye ettigim yapi cunku container'lar
// -mumkun oldugunca- kendilerini kaplayan harici kutuphanelerden bagimsiz
// olmali.
import { navigate, navigationRef } from './navigation/navigation';

// Store
import store from './redux/configure-store';

const DetailsScreen = ({navigation}: {navigation: any}): JSX.Element => {  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

const HomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  const auth = useSelector(
       (state: RootState) => state.auth
  )
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen {auth.firstName}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigate('Details', null)}
      />
    </View>
  );
}

const SettingsScreen = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

// function WelcomeScreen({ navigation }) {
// ilk basta bu satirda navigation icin tslint Binding element 'navigation' implicitly has an 'any' type.ts
// hatasi veriyor ve bu hatayi gidermek icin
// fonksiyon tanitim seklini ve tip eklemelerini yapinca
// sorun cozuluyor.
const WelcomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome screen</Text>
      <Button
        title="Go to TabScreen"
        onPress={() => navigation.navigate('TabScreen')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown : false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{headerShown : false}}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Settings" component={SettingsStackScreen} />
  </Tab.Navigator>)
}

const MainStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator>
          <MainStack.Screen name="Details" component={WelcomeScreen} />
          <MainStack.Screen name="TabScreen" component={TabScreen} options={{headerShown : false}} />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}