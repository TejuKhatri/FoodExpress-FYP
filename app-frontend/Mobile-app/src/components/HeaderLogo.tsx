import React from "react";
import { View, Text, Image, StyleSheet, Platform, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HeaderLogo() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />
      
      {/* Title */}
      <Text style={styles.title}>Food Express</Text>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Notifications Icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("NotificationsScreen" as never)}
      >
        <Ionicons name="notifications" size={24} color="white" />
      </TouchableOpacity>

      {/* Profile Icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate("ProfileScreen" as never)}
      >
        <Ionicons name="person" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 50,
    backgroundColor: "#ff6600",
    width: "100%",
   
    
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
  },
  iconButton: {
    marginLeft: 30,
  },
  
});
