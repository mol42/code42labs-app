import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import AppNavigationContainer from "./containers";
// bu import sayesinde react-navigation'un ana kapsayici nesnesinin
// referansina erisebiliyoruz ve onun yardimi ile uygulamanin herhangi
// bir noktasinda referans objesini import ettigimizde navigasyon
// islemlerini cagirabiliyoruz.
// Ornegin redux thunk kodlari icinde cagirabilir hale geliyoruz.
// Bu yapi sahsen benim tavsiye ettigim yapi cunku container'lar
// -mumkun oldugunca- kendilerini kaplayan harici kutuphanelerden bagimsiz
// olmali.
import { navigationRef } from "./navigation/navigation";
import { ThemeContext, initTheme } from "./config/theming";
import { initI18n } from "./config/i18n";

initTheme("white");
initI18n("tr");

// Store
import store from "./redux/configure-store";

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeContext.ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <AppNavigationContainer />
          </NavigationContainer>
        </SafeAreaProvider>
        <FlashMessage position="top" />
      </ThemeContext.ThemeProvider>
    </Provider>
  );
}
