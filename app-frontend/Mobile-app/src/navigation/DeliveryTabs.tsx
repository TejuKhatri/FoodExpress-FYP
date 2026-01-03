import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";

// Example screens
const OrdersScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Orders</Text>
  </View>
);

const EarningsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Earnings</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Profile</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function DeliveryTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Orders") iconName = focused ? "list" : "list-outline";
          else if (route.name === "Earnings") iconName = focused ? "cash" : "cash-outline";
          else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 5 },
      })}
    >
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
