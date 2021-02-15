import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import AppBody from "./AppBody";

// Store
import store from "./redux/configure-store";

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppBody store={store} />
      </SafeAreaProvider>
      <FlashMessage position="top" />
    </Provider>
  );
}
