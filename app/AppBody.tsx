import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
import { ThemeContext, whiteTheme, darkTheme } from "./config/theming";
import { initI18n } from "./config/i18n";
import { initAuth } from "./redux/modules/auth/auth-reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/root-reducer";

export default function AppBody(props: any): JSX.Element {
  const dispatch = useDispatch();
  const globalState = useSelector((state: RootState) => state.global);
  const selectedTheme = globalState.theme === "normal" ? whiteTheme : darkTheme;

  useEffect(function() {
    initI18n("tr");
    dispatch(initAuth(null));
  }, []);

  if (!globalState.isInited) {
    return <></>;
  }

  return <ThemeContext.ThemeProvider theme={selectedTheme}>
    <NavigationContainer ref={navigationRef}>
      <AppNavigationContainer/>
    </NavigationContainer>
  </ThemeContext.ThemeProvider>;
}
