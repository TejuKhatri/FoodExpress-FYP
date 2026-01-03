import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./Mobile-app/src/navigation/MainStack";
import { CartProvider } from "./Mobile-app/src/Context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </CartProvider>
  );
}
