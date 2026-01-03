import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CustomerTabs from "../navigation/CustomerTabs";
import RestaurantTabs from "../navigation/RestaurantTabs";
import DeliveryTabs from "../navigation/DeliveryTabs";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  CustomerDashboard: undefined;
  RestaurantDashboard: undefined;
  DeliveryDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="CustomerDashboard" component={CustomerTabs} />
      <Stack.Screen name="RestaurantDashboard" component={RestaurantTabs} />
      <Stack.Screen name="DeliveryDashboard" component={DeliveryTabs} />
    </Stack.Navigator>
  );
}
