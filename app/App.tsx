import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigationContainer from "./containers";
// bu import sayesinde react-navigation'un ana kapsayici nesnesinin
// referansina erisebiliyoruz ve onun yardimi ile uygulamanin herhangi
// bir noktasinda referans objesini import ettigimizde navigasyon
// islemlerini cagirabiliyoruz.
// Ornegin redux thunk kodlari icinde cagirabilir hale geliyoruz.
// Bu yapi sahsen benim tavsiye ettigim yapi cunku container'lar
// -mumkun oldugunca- kendilerini kaplayan harici kutuphanelerden bagimsiz
// olmali.
import { navigationRef } from './navigation/navigation';
// Store
import store from './redux/configure-store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigationContainer />
      </NavigationContainer>
    </Provider>
  );
}