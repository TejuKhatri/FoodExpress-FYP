import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RestaurantHome from "../screens/RestaurantHome";
import RestaurantOrders from "../screens/RestaurantOrders";
import RestaurantMenu from "../screens/RestaurantMenu";
import RestaurantProfile from "../screens/RestaurantProfile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function RestaurantTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={RestaurantHome}
        options={{ tabBarIcon: () => <Ionicons name="home" size={22} /> }}
      />
      <Tab.Screen
        name="Orders"
        component={RestaurantOrders}
        options={{ tabBarIcon: () => <Ionicons name="receipt" size={22} /> }}
      />
      <Tab.Screen
        name="Menu"
        component={RestaurantMenu}
        options={{ tabBarIcon: () => <Ionicons name="fast-food" size={22} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={RestaurantProfile}
        options={{ tabBarIcon: () => <Ionicons name="person" size={22} /> }}
      />
    </Tab.Navigator>
  );
}
