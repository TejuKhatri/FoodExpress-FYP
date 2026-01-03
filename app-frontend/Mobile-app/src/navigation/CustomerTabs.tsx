// src/navigation/CustomerTabs.tsx
import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// ========== Screens ==========
import CustomerHome from "../screens/CustomerHome";
import MenuScreen from "../screens/MenuScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PaymentScreen from "../screens/PaymentScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchBarScreen from "../screens/SearchBarScreen";
import RestaurantListScreen from "../screens/RestaurantListScreen";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";

// More Screens
import MoreScreen from "../screens/MoreScreen";
import AboutFoodExpressScreen from "../screens/More/AboutFoodExpressScreen";
import DeliveryChargeScreen from "../screens/More/DeliveryChargeScreen";
import PrivacyPolicyScreen from "../screens/More/PrivacyPolicyScreen";
import TermsScreen from "../screens/More/TermsScreen";
import FAQScreen from "../screens/More/FAQScreen";
import FeedbackScreen from "../screens/More/FeedbackScreen";

// Profile menu target screens e/...)
import MyFavoritesScreen from "../screens/CustomerProfile/MyFavoritesScreen";
import OrderHistoryScreen from "../screens/CustomerProfile/OrderHistoryScreen";
import ManageAddressScreen from "../screens/CustomerProfile/ManageAddressScreen";
import VoucherVaultScreen from "../screens/CustomerProfile/VoucherVaultScreen";


import EditProfileScreen from "../screens/CustomerProfile/EditProfileScreen";

// ========== Navigators ==========
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ========== Home Stack ==========
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerHome" component={CustomerHome} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="SearchBarScreen" component={SearchBarScreen} />
      <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />

    </Stack.Navigator>
  );
}

// ========== Profile Stack (NEW) ==========
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />

      {/* These names MUST match what you use in ProfileScreen navigation.navigate(...) */}
      <Stack.Screen
        name="Favorites"
        component={MyFavoritesScreen}
        options={{ title: "My Favorites" }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ title: "Order History" }}
      />
      <Stack.Screen
        name="ManageAddress"
        component={ManageAddressScreen}
        options={{ title: "Manage Delivery Address" }}
      />
      <Stack.Screen
        name="VoucherVault"
        component={VoucherVaultScreen}
        options={{ title: "Voucher Vault" }}
      />

      {/* Optional (remove if you don't have this screen/file) */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}

// ========== More Stack ==========
function MoreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{ title: "More" }}
      />
      <Stack.Screen
        name="AboutFoodExpressScreen"
        component={AboutFoodExpressScreen}
        options={{ title: "About FoodExpress" }}
      />
      <Stack.Screen
        name="DeliveryChargeScreen"
        component={DeliveryChargeScreen}
        options={{ title: "Delivery Charges" }}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{ title: "Privacy Policy" }}
      />
      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{ title: "Terms & Conditions" }}
      />
      <Stack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{ title: "FAQs" }}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{ title: "Feedback" }}
      />
    </Stack.Navigator>
  );
}

// ========== Customer Tabs ==========
export default function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff6347",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Home</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Cart</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Orders</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" size={size} color={color} />
          ),
        }}
      />

      {/* Profile tab now uses ProfileStack so menu can navigate */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>Profile</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreStack}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color }}>More</Text>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
